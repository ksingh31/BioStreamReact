import { makeAutoObservable, observable } from "mobx";
import { Alert } from "react-native";
import { User } from "../models/User";

class UserStore {
    @observable user: User = {
        name: 'Karan',
        description: 'Welcome to the React Native'
    };
    @observable name: string = 'Karan';
    @observable title: string = 'Details Page';

    constructor() {
        makeAutoObservable(this);
    }

    triggerAlert = () => {
        Alert.alert('Event triggered from MobX Store');
    }

    updateUser = () => {
        this.user = {
            ...this.user,
            name: 'Ruyii',
            description: 'Welcome to the React Native 2'
        };
        this.name = 'Lee';
    }

    updateTitle = () => {
        this.title = this.title + '!';
    }
}

export default new UserStore();