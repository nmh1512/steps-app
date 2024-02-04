<template>
  <v-app>
    <v-main class="main">
      <v-card>
        <v-tabs
          v-model="tab"
          bg-color="white"
        >
          <v-tab value="0">Step 1</v-tab>
          <v-tab value="1"
            :disabled="isDisabledStep2"
            >Step 2</v-tab>

          <v-tab value="2"
            :disabled="isDisabledStep3"
            >Step 3</v-tab>

          <v-tab value="3"
            :disabled="isDisabledStep4"
            >Review</v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="0">
              <StepFirst 
                ref="stepFirstRef"
                 @inputChanged="handleCheckInputValidate" />
            </v-window-item>

            <v-window-item value="1">
              <StepSecond 
                ref="stepSecondRef" 
                @inputChanged="handleCheckInputValidate"
                :order="order"
                />
            </v-window-item>

            <v-window-item value="2">
              <StepThird 
                ref="stepThirdRef" 
                @inputChanged="handleCheckInputValidate"
                :order="order"
                />
            </v-window-item>

            <v-window-item value="3">
              Four
            </v-window-item>
          </v-window>
        </v-card-text>

        <v-card-text>
          <v-row class="d-flex justify-space-between">
            <v-btn
              v-if="tab > 0"
              variant="text"
              @click="handlePeriousStep"
            >
              Previous
            </v-btn>
            <div></div>
            <v-btn
              variant="text"
              @click="handleNextStep"
            >
              {{ tab < 3 ? 'Next' : 'Submit' }}
            </v-btn>
          </v-row>
         
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import StepFirst from './components/StepFirst.vue';
import StepSecond from './components/StepSecond.vue';
import StepThird from './components/StepThird.vue';

export default {
  name: 'App',

  components: {
    StepFirst,
    StepSecond,
    StepThird
  },

  data: () => ({
    tab: 0,
    isDisabledStep2: true,
    isDisabledStep3: true,
    isDisabledStep4: true,
    order: {
      meal: null,
      totalPeoples: null,
      restaurant: null
    },
    curentStep: 1
  }),
  methods: {
    handleNextStep() {
      let stepRefName;
      switch (this.tab) {
        case 1:
          stepRefName = 'stepSecondRef'
          break;
        case 2:
          stepRefName = 'stepThirdRef'
          break;
        case 3:
          stepRefName = 'stepReviewRef'
          break;
        default:
          stepRefName = 'stepFirstRef'
          break;
      }
      const stepRef = this.$refs[stepRefName];
      stepRef.validateForm().then(res => {
        if (res.valid) {
          ++this.tab;
          ++this.curentStep;
        }
      })
    },

    handlePeriousStep() {
      if (this.tab > 0) --this.tab
    },
  
    handleCheckInputValidate(data) {
      this.order = {...this.order, ...data};
      if(this.order.meal !== data.meal && data.meal !== undefined) {
        this.order.totalPeoples = null
      }
      this[`isDisabledStep${this.curentStep + 1}`] = this.hasFieldEmpty(data)
    },

    hasFieldEmpty(obj) {
      return Object.values(obj).includes('') || Object.values(obj).includes(null) || Object.values(obj).includes(undefined);
    }
  },
}
</script>

<style>
  .main {
    width: 60%;
    margin: 50px auto;
  }
  form label {
      font-size: 1rem;
  }
</style>
