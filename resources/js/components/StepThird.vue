<template>
    <v-sheet class="mx-auto">
        <v-form ref="formRef" @submit.prevent>
            <v-row
                v-for="(item) in form.dishes"
            >
                <v-col>
                    <label class="mb-3">Please select a dish</label>
                    <v-autocomplete
                        v-model="item.dishName"
                        :items="dishes"
                        variant="outlined"
                        class="mt-3"
                        required
                        :rules="rules.dishes.dishName"
                        @update:modelValue="handleInput"
                    >
                    </v-autocomplete>
                </v-col>
                <v-col>
                    <label class="mb-3">Please enter no. of servings</label>
                    <v-text-field
                        v-model="item.servings"
                        variant="outlined"
                        required
                        class="mt-3"
                        :rules="rules.dishes.servings"
                        type="number"
                        @input="handleInput"
                    ></v-text-field>
                </v-col>
            </v-row>
            
            <v-btn 
                class="mt-3" 
                icon="$plus" 
                variant="tonal"
                @click="handleAddDish"
                ></v-btn>
         </v-form>
         <v-text-field
            style="width: 50%;"
            v-model="form.totalDishes"
            :rules="rules.dishes.totalDishes"
            @input="handleInput"
            :readonly="true"
            label="Total Dishes"
            class="mt-4"
            >
        </v-text-field>
    </v-sheet>
</template>

<script>
import mixinSteps from "../mixins/mixinSteps";
export default {
    name: "StepFirst",
    mixins: [mixinSteps],
    data: () => ({
        form: {
            dishes: [
                {
                    dishName: null,
                    servings: 1
                }
            ],
            totalDishes: 0
        },
    }),
    computed: {
        dishes() {
            if(!this.order.restaurant) return [];
            const dishes = this.$dishes.filter(item => item.restaurant === this.order.restaurant);
            return [...new Set(dishes.map(item => item.name))];
        }
    },
    methods: {
        handleAddDish() {
            if (this.form.dishes.length === this.dishes.length) return
            this.form.dishes.push({dishName: null, servings: 1})
            this.handleInput();
        },
    },
    watch: {
    form: {
        handler(newForm) {
            this.form.totalDishes = newForm.dishes.reduce((total, dish) => total + (parseInt(dish.servings) || 0), 0);
        },
        deep: true
    }
}
};
</script>

<style>
form label {
    font-size: 1.2rem;
}
</style>
