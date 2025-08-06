import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        backgroundColor: '#f4f4f4',
        flex: 1,
        
    },

    input: {
        borderWidth: 1,
        height: 80,
        width: 80,
    },

    fila: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    button: {
        width: 100,
        height: 50,
        backgroundColor: 'red',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default styles;