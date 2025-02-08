import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";


//TODO: Add win/loss record to the list, and styling

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

function convertTime(time) {
    var date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ScoreboardList() {

    const [allScoreboards, setAllScoreData] = useState([]);
    useEffect(() => {
        fetch('scoreboard').then(res => res.json()).then(data => {
            setAllScoreData(data.scoreboard)
            console.log(data);
        });

    }, [])

    const [secondary, setSecondary] = React.useState(false);


    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <FormGroup row>
                {/* <FormControlLabel
                    control={
                        <Checkbox
                            checked={dense}
                            onChange={(event) => setDense(event.target.checked)}
                        />
                    }
                    label="Enable dense"
                /> */}
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={secondary}
                            onChange={(event) => setSecondary(event.target.checked)}
                        />
                    }
                    label="Show/Hide Scores"
                />
            </FormGroup>
            <Grid container spacing={2}>
                <Grid item xs={'auto'} md={7}
                >
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
                        Today's Games:
                    </Typography>
                    <Demo>
                        <List>
                            {allScoreboards.map(scoreboard => (
                                <ListItem key={scoreboard.gameCode}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary=
                                        {scoreboard.away + " @ " + scoreboard.home}

                                        secondary={secondary ? scoreboard.awayScore + "-" + scoreboard.homeScore : null}
                                    />

                                    <Typography>{scoreboard.gameClock ? "Q" + scoreboard.period + " " + scoreboard.gameClock : convertTime(scoreboard.gameTime)}</Typography>


                                </ListItem>
                            ))}
                        </List>
                    </Demo>
                </Grid>
            </Grid>
        </Box>
    );
}