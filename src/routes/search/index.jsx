import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Search } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './styles';
import MuiNotification from '../../components/mui-notification';
import SQS from '../../utils/sqs-client';


const SearchPage = () => {
    const classes = useStyles();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    const notiAttribute = (type, message, open) => ({type, message, open});

    const repeater = (fn, count) => {
        fn().then((response) => {
            if (response.Messages) {
                count += response.Messages.length;
                setShowNotifications(true);
                setNotifications((notifications) => [...notifications, notiAttribute("info", response.Messages[0].Body, true)]);
            }
            if (count < 2) {
                return repeater(fn, count);
            }
            setLoading(false);
            setTimeout(clearNotifications, 2000);
        })
    }

    const clearNotifications = () => {
        setShowNotifications(false);
        setNotifications([]);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        if (query === "") return
        setLoading(true);
        const endpoint = `https://abvnzdcu99.execute-api.us-east-1.amazonaws.com/mysearch/posts?query=${query}`;
        try {
            const queueUrl = (await axios.get(endpoint)).data;
            setShowNotifications(true);
            setNotifications((notifications) => [...notifications, notiAttribute("info", "Querying data, please wait!", true)]);
            const sqsClient = new SQS(queueUrl);
            repeater(sqsClient.receiveMessage, 0)
        }
        catch (error) {
            console.error(error, error.stack);
        }        
    }


    return (
        <>
            {notifications.length > 0 && <MuiNotification notifications={notifications} show={showNotifications}/>}
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '80vh' }}
            >
                <Grid item xs={5}>
                    <form className={classes.container} onSubmit={handleSearch} noValidate autoComplete="off">
                        <TextField 
                            label="Search" 
                            variant="outlined" 
                            size="small" 
                            onChange={(e) => setQuery(e.target.value)} 
                            className={classes.searchBox}
                            InputProps={{
                                readOnly: loading
                            }}
                        />
                        <Button variant="contained" type="submit" color="primary">
                            {loading ? <CircularProgress size={20} className={classes.circularProgress} /> : <Search />}
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </>
    )
}

export default SearchPage;