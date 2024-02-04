<template>
    <v-sheet width="500" class="mx-auto">
        <v-row class="mb-2">
            <v-col>
                <span class="font-weight-bold">Meal</span>
            </v-col>
            <v-col>
                <span>{{ order.meal }}</span>
            </v-col>
        </v-row>
        <v-row class="mb-2">
            <v-col>
                <span class="font-weight-bold">No. of people</span>
            </v-col>
            <v-col>
                <span>{{ order.totalPeoples }}</span>
            </v-col>
        </v-row>
        <v-row class="mb-2">
            <v-col>
                <span class="font-weight-bold">Restaurant</span>
            </v-col>
            <v-col>
                <span>{{ order.restaurant }}</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <span class="font-weight-bold">Dishes</span>
            </v-col>
            <v-col>
                <div class="border-wrap">
                    <p class="mb-3" v-for="item in order.dishes">{{ item.dishName }} - {{ item.servings }}</p>
                </div>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>
import mixinSteps from "../mixins/mixinSteps";

export default {
    name: "StepReview",
    mixins: [mixinSteps],
};
</script>

<style scoped>
.border-wrap {
    border: 3px solid;
    padding: 5px 5px 20px;
}
span, p {
    font-size: 1.1rem;
}
</style>