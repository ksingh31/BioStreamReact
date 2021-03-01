import React from 'react';
import { Button, Text, View } from 'react-native';
import { observer } from 'mobx-react';
import userStore from '../../stores/userStore';
import { styles } from './styles';

function AppDetails() {
    return(
        <AppDetailsView />
    );
}

const AppDetailsView = observer(() => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
                { userStore.title }
            </Text>
            <Text>
                <Button onPress={userStore.updateTitle} title='Update Text' color="#841584" />
            </Text>
        </View>
    )
});

export default observer(AppDetails)