export default {
    props: {
        order: { type: Object, default: null },
    },
    data() {
        return {
            rules: {
                meal: [(v) => !!v || "Meal is required"],
                totalPeoples: [
                    (v) => !!v || "Total of people is required",
                    (v) => (v && v < 10) || "Total of people must be less than 10",
                ],
                restaurant: [(v) => !!v || "Restaurant is required"],
                dishes: {
                    dishName: [
                        (v) => !!v || "Dish is required",
                        (v) => {
                            if (!v) return true;
                            const dishNames = this.form.dishes.map(dish => dish.dishName);
                            const duplicateDish = dishNames.filter((name, index) => {
                                if (name) return dishNames.indexOf(name) !== index
                            });
                            return !duplicateDish.length || "You have already chosen this dish";
                        }
                    ],
                    servings: [
                        (v) => !!v || "Servings is required",
                        (v) => (v && v < 10) || "Servings must be less than 10",
                    ]
                }
            }
        }
    },

    methods: {
        validateForm() {
            return this.$refs.formRef.validate();
        },
        handleInput() {
            this.$emit("inputChanged", this.form);
        },
    },
};
