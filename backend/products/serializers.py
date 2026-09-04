from rest_framework import serializers
from .models import Order, OrderItem, Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "long_description",
            "price",
            "image",
            "category",
            "features",
            "specifications",
            "related_products",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]

class OrderItemInputSerializer(serializers.Serializer):
    """Format attendu pour un article dans la requête de création de commande."""

    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.filter(is_active=True)
    )
    quantity = serializers.IntegerField(min_value=1)


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = [
            "id",
            "product",
            "product_name",
            "unit_price",
            "quantity",
            "subtotal",
        ]
        read_only_fields = fields


class OrderSerializer(serializers.ModelSerializer):
    # En lecture : détail des articles avec nom/prix figés + sous-total.
    items = OrderItemSerializer(many=True, read_only=True)
    total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    # En écriture uniquement : liste simplifiée product/quantity envoyée
    # par le frontend depuis le panier.
    order_items = OrderItemInputSerializer(many=True, write_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "customer_name",
            "customer_phone",
            "customer_email",
            "status",
            "items",
            "order_items",
            "total",
            "created_at",
        ]
        read_only_fields = ["id", "status", "items", "total", "created_at"]

    def validate_order_items(self, value):
        if not value:
            raise serializers.ValidationError("Le panier est vide.")
        return value

    def create(self, validated_data):
        items_data = validated_data.pop("order_items")
        order = Order.objects.create(**validated_data)

        OrderItem.objects.bulk_create(
            [
                OrderItem(
                    order=order,
                    product=item["product"],
                    product_name=item["product"].name,
                    unit_price=item["product"].price,
                    quantity=item["quantity"],
                )
                for item in items_data
            ]
        )
        return order