
var cls = require("./lib/class"),
    Messages = require("./message"),
    Utils = require("./utils"),
    Properties = require("./properties"),
    Types = require("../../shared/js/gametypes");

module.exports = Character = Entity.extend({
    init: function(id, type, kind, x, y) {
        this._super(id, type, kind, x, y);
        
        this.orientation = Utils.randomOrientation();
        this.attackers = {};
        this.target = null;

        Utils.Mixin(this.data, {
            level: 1,
            hp: 0,
            armor: null,
            weapon: null
        });

        this.hp = this.maxHP;
    },
   
    set level(level) {
        this.data.level = level;
        this.save();
    },

    get level() {
        return this.data.level;
    },

    set hp(hp) {
        this.data.hp = Math.min(this.maxHP, hp);
        this.save();
    },

    get hp() {
        return this.data.hp;
    },

    get maxHP() {
        return 80 + this.level*20;
    },

    get armor() {
        return this.data.armor;
    },

    set armor(armor) {
        this.data.armor = armor;
        this.save();
    },

    get weapon() {
        return this.data.weapon;
    },

    set weapon(weapon) {
        this.data.weapon = weapon;
        this.save();
    },

    get armorLevel() {
        return Properties.getArmorLevel(this.armor);
    },

    get weaponLevel() {
        return Properties.getWeaponLevel(this.weapon);
    },

    getState: function() {
        var basestate = this._getBaseState(),
            state = [];
        
        state.push(this.orientation);
        if(this.target) {
            state.push(this.target);
        }
        
        return basestate.concat(state);
    },
    
    resetHitPoints: function(maxHitPoints) {
        this.hp = maxHitPoints;
        this.maxHP = maxHitPoints;
    },
    
    regenHealthBy: function(value) {
        var hp = this.hp,
            max = this.maxHP;

        this.hp = Math.min(hp + value, max);
    },
    
    hasFullHealth: function() {
        return this.hp === this.maxHP;
    },
    
    setTarget: function(entity) {
        this.target = entity.id;
    },
    
    clearTarget: function() {
        this.target = null;
    },
    
    hasTarget: function() {
        return this.target !== null;
    },
    
    attack: function() {
        return new Messages.Attack(this.id, this.target);
    },
    
    health: function() {
        return new Messages.Health(this.hp, false);
    },
    
    regen: function() {
        return new Messages.Health(this.hp, true);
    },
    
    addAttacker: function(entity) {
        if(entity) {
            this.attackers[entity.id] = entity;
        }
    },
    
    removeAttacker: function(entity) {
        if(entity && entity.id in this.attackers) {
            delete this.attackers[entity.id];
            log.debug(this.id +" REMOVED ATTACKER "+ entity.id);
        }
    },
    
    forEachAttacker: function(callback) {
        for(var id in this.attackers) {
            callback(this.attackers[id]);
        }
    },

    loadFromDB: function() {
        if (!this.dbEntity) return;
        
        this._super();
    },

    save: function() {
        if (!this.dbEntity) return;

        this._super();
    }
});
