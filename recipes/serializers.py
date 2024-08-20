from rest_framework import serializers
from .models import Recipe, Step

class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ['step_number', 'instruction']

class RecipeSerializer(serializers.ModelSerializer):
    steps = StepSerializer(many=True, read_only=False)

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'steps']
    
    def create(self, validated_data):
        steps_data = validated_data.pop('steps', None)
        recipe = Recipe.objects.create(**validated_data)
        if steps_data:
            for step_data in steps_data:
                Step.objects.create(recipe=recipe, **step_data)
        return recipe

    def update(self, instance, validated_data):
        steps_data = validated_data.pop('steps', None)
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.save()

        if steps_data is not None:
            # Clear existing steps
            instance.steps.all().delete()

        # Add new steps
            for step_data in steps_data:
                Step.objects.create(recipe=instance, **step_data)

        return instance