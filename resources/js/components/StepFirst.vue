<template>
    <v-sheet width="300" class="mx-auto">
        <v-form ref="formRef" @submit.prevent>
            <div>
                <label class="mb-3">Please select a meal</label>
                <v-autocomplete
                    v-model="form.meal"
                    :items="['Breakfast', 'Lunch', 'Dinner']"
                    variant="outlined"
                    class="mt-3"
                    required
                    :rules="rules.meal"
                    @update:modelValue="handleInput"
                >
                </v-autocomplete>
            </div>

            <div class="mt-3">
                <label class="mb-3">Please enter number of people</label>
                <v-text-field
                    v-model="form.totalPeoples"
                    variant="outlined"
                    required
                    class="mt-3"
                    :rules="rules.totalPeoples"
                    type="number"
                    @input="handleInput"
                ></v-text-field>
            </div>
        </v-form>
    </v-sheet>
</template>

<script>
import mixinSteps from "../mixins/mixinSteps";
export default {
    name: "StepFirst",
    mixins: [mixinSteps],
    data: () => ({
        form: {
            meal: null,
            totalPeoples: null,
        },
    }),
};
</script>

<style>
form label {
    font-size: 1.2rem;
}
</style>
