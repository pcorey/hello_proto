import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

const map = {
    CATS: 'rule',
    DOGS: 'drool'
};

Meteor.startup(() => {
    _.extend(map, {
        facts: {
            CATS: 'rule',
            DOGS: 'drool'
        },
        locked: true
    });
});

Meteor.methods({
    update: function(field, value) {
        if (map.locked) {
            throw new Meteor.Error("The map is locked. Can't update facts.");
        } else {
            return _.set(map, ['data', field], value);
        }
    },
    private: function() {
        let user = Meteor.users.findOne({ _id: this.userId });
        if (!user || !user.isAdmin) {
            throw new Meteor.Error('Not authorized.');
        }
        return 'Did private thing';
    }
});
