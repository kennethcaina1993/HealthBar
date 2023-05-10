function getRandomValue(min,max){
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: []
    }
  },
  computed: {
    monsterBarStyles(){
      if (this.monsterHealth < 0) {
        return {width: '0%'};
      }
      return {width: this.monsterHealth + '%'}
    },
    playerBarStyles(){
      if (this.playerHealth < 0) {
        return {width: '0%'}
      }
      return {width: this.playerHealth + '%'}
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    }
  },
  watch: {
    playerHealth(value){
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      } else if(value <= 0){
        this.winner = 'monster';
      }
    },
    monsterHealth(value){
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if(value <= 0){
        this.winner = 'player';
      }
    }
  },
  methods:{
    // getRandomValue(min,max){
    //   return Math.floor(Math.random() * (max - min)) + min
    // },
    addLogMessage(who,what,value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      });
    },
    startNewGame(){
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner= null;
      this.currentRound = 0;
      this.logMessages =[]

    },
    AttackMonster(){
      this.currentRound++;
      const attackValue = getRandomValue(5, 12)
      this.monsterHealth = this.monsterHealth - attackValue;
      this.addLogMessage('player','attack',attackValue);
      this.AttackPlayer();
    },
    AttackPlayer(){
      const attackValue = getRandomValue(8, 20);
      this.playerHealth = this.playerHealth - attackValue;
      this.addLogMessage('monster','attack',attackValue);

    },
    SpecialAttack() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.addLogMessage('player','attack',attackValue);
      this.AttackPlayer();
    },
    healPlayer(){
      this.currentRound++;
      const healValue = getRandomValue(8, 30)
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth = this.playerHealth + healValue;
      }
      this.AttackPlayer();
    },
    surrender(){
      this.winner = 'monster';
    }
  },
})
app.mount('#game')