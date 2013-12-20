
var cls = require("./lib/class"),
    _ = require("underscore"),
    Utils = require("./utils"),
    Types = require("../../shared/js/gametypes");

var Messages = {};
module.exports = Messages;

var Message = cls.Class.extend({
});

Messages.Spawn = Message.extend({
    init: function(entity) {
        this.entity = entity;
    },
    serialize: function() {
        var spawn = [Types.Messages.SPAWN];
        return spawn.concat(this.entity.getState());
    }
});

Messages.Despawn = Message.extend({
    init: function(entityId) {
        this.entityId = entityId;
    },
    serialize: function() {
        return [Types.Messages.DESPAWN, this.entityId];
    }
});

Messages.Move = Message.extend({
    init: function(entity) {
        this.entity = entity;
    },
    serialize: function() {
        return [Types.Messages.MOVE,
                this.entity.id,
                this.entity.x,
                this.entity.y];
    }
});

Messages.LootMove = Message.extend({
    init: function(entity, item) {
        this.entity = entity;
        this.item = item;
    },
    serialize: function() {
        return [Types.Messages.LOOTMOVE,
                this.entity.id,
                this.item.id];
    }
});

Messages.Loot = Message.extend({
    init: function(item) {
        this.item = item;
    },
    serialize: function() {
        return [Types.Messages.LOOT,
                this.item.id];
    }
});

Messages.Attack = Message.extend({
    init: function(attackerId, targetId) {
        this.attackerId = attackerId;
        this.targetId = targetId;
    },
    serialize: function() {
        return [Types.Messages.ATTACK,
                this.attackerId,
                this.targetId];
    }
});

Messages.HitPoints = Message.extend({
    init: function(maxHitPoints) {
        this.maxHitPoints = maxHitPoints;
    },
    serialize: function() {
        return [Types.Messages.HP,
                this.maxHitPoints];
    }
});

Messages.EquipItem = Message.extend({
    init: function(player, itemKind) {
        this.playerId = player.id;
        this.itemKind = itemKind;
    },
    serialize: function() {
        return [Types.Messages.EQUIP,
                this.playerId,
                this.itemKind];
    }
});

Messages.Drop = Message.extend({
    init: function(entity, item) {
        this.entity = entity;
        this.item = item;
    },
    serialize: function() {
        var drop = [Types.Messages.DROP,
                    this.entity.id,
                    this.item.id,
                    this.item.kind,
                    _.pluck(this.entity.hatelist, "id")];

        var pos = null;
        if (this.entity instanceof Player) {
            pos = {x: this.entity.x, y: this.entity.y};
        }
        drop.push(pos);
        return drop;
    }
});

Messages.Chat = Message.extend({
    init: function(player, message, channel) {
        this.playerId = player.id;
        this.message = message;
        this.channel = channel;
    },
    serialize: function() {
        return [Types.Messages.CHAT,
                this.playerId,
                this.message,
                this.channel];
    }
});

Messages.Teleport = Message.extend({
    init: function(entity) {
        this.entity = entity;
    },
    serialize: function() {
        return [Types.Messages.TELEPORT,
                this.entity.id,
                this.entity.x,
                this.entity.y];
    }
});

Messages.Damage = Message.extend({
    init: function(entity, points, attacker) {
        this.entity = entity;
        this.points = points;
        this.attacker = attacker;
    },
    serialize: function() {
        return [Types.Messages.DAMAGE,
                this.entity.id,
                this.points,
                this.attacker.id];
    }
});

Messages.Health = Message.extend({
    init: function(entity, isRegen) {
        this.entity = entity;
        this.isRegen = isRegen;
    },
    serialize: function() {
        var health = [Types.Messages.HEALTH,
                      this.entity.id,
                      this.entity.hp,
                      this.entity.maxHP];
        
        if (this.isRegen) {
            health.push(1);
        }
        return health;
    }
});
Messages.Population = Message.extend({
    init: function(world, total) {
        this.world = world;
        this.total = total;
    },
    serialize: function() {
        return [Types.Messages.POPULATION,
                this.world,
                this.total];
    }
});

Messages.Level = Message.extend({
    init: function(level) {
        this.level = level;
    },
    serialize: function() {
        return [Types.Messages.LEVEL,
                this.level];
    }
});

Messages.XP = Message.extend({
    init: function(xp, maxXP, gainedXP) {
        this.xp = xp;
        this.maxXP = maxXP;
        this.gainedXP = gainedXP | 0;
    },
    serialize: function() {
        return [Types.Messages.XP,
                this.xp,
                this.maxXP,
                this.gainedXP];
    }
});

Messages.Kill = Message.extend({
    init: function(mob) {
        this.mob = mob;
    },
    serialize: function() {
        return [Types.Messages.KILL,
                this.mob.kind];
    }
});

Messages.List = Message.extend({
    init: function(ids) {
        this.ids = ids;
    },
    serialize: function() {
        var list = this.ids;
        
        list.unshift(Types.Messages.LIST);
        return list;
    }
});

Messages.Destroy = Message.extend({
    init: function(entity) {
        this.entity = entity;
    },
    serialize: function() {
        return [Types.Messages.DESTROY,
                this.entity.id];
    }
});

Messages.Blink = Message.extend({
    init: function(item) {
        this.item = item;
    },
    serialize: function() {
        return [Types.Messages.BLINK,
                this.item.id];
    }
});

Messages.Data = Message.extend({
    init: function(data) {
        this.data = data;
    },
    serialize: function() {
        return [Types.Messages.DATA,
                this.data];
    }
});

Messages.Inventory = Message.extend({
    init: function(inventory) {
        this.inventory = inventory;
    },
    serialize: function() {
        return [Types.Messages.INVENTORY,
                    this.inventory.serialize()];
    }
});
