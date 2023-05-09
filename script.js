function getRandomValue(min,max){
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
    }
  },
  computed:{
    monsterBarStyles() {
      return {width: this.monsterHealth + '%'}
    },
    playerBarStyles() {
      return {width: this.playerHealth + '%'}
    }
  },
  methods: {
    AttackMonster(){
      const attackValue = getRandomValue(5, 12)
      this.monsterHealth = this.monsterHealth - attackValue;
      this.AttackPlayer();
    },
    AttackPlayer(){
      const attackValue = getRandomValue(8, 15)
      this.playerHealth = this.playerHealth - attackValue;
    }
  },
});
app.mount('#game')