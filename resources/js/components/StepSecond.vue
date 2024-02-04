<template>
    <v-sheet width="300" class="mx-auto">
        <v-form ref="formRef" @submit.prevent>
            <label class="mb-3">Please select a restaurant</label>
            <v-autocomplete 
                v-model="form.restaurant" 
                :items="restaurants" 
                variant="outlined" 
                class="mt-3" 
                required
                :rules="rules.restaurant"
                @update:modelValue="handleInput">
            </v-autocomplete>
        </v-form>
    </v-sheet>
</template>

<script>
import mixinSteps from "../mixins/mixinSteps";

export default {
    name: "StepSecond",
    mixins: [mixinSteps],
    data: () => ({
        form: {
            restaurant: null,
        },
    }),
    computed: {
        restaurants() {
            const availableMeals = this.$dishes.filter(item => item.availableMeals.includes(this.order.meal.toLowerCase()));
            return [...new Set(availableMeals.map(item => item.restaurant))];
        }
    },
    watch: {
        'order.meal': {
            handler(newVal) {
                if (newVal) {
                    this.form.restaurant = null;
                } 
            }
        }
    }
};
</script>


