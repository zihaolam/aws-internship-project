import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    searchBox: {
        width: "300px",
        marginRight: "0.5em",
        boxShadow: '0 3px 5px 2px #eeeeee',
        borderRadius: "0.5em"
    },
    searchButton: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        // border: 0,
        color: 'white'
    },
    container: {
        display: "flex",
        flex: "row"
    },
    circularProgress: {
        color: "white"
    }
}));

export default useStyles;