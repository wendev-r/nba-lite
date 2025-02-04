import pandas as pd
from nba_api.stats.endpoints import teamyearbyyearstats
from nba_api.stats.endpoints import teamdetails
from nba_api.stats.static import teams
from nba_api.live.nba.endpoints import scoreboard
from io import StringIO
import json
from flask import jsonify
import pickle
from flask import Flask




app = Flask(__name__)


def get_scoreboard_list():
    games = scoreboard.ScoreBoard()
    games_df = pd.read_json(StringIO(games.get_json()))
    scoreboard_list = (games_df.iloc[7])['scoreboard']
    return scoreboard_list


# @app.route('/home_team_scoreboard')
# def get_home_team_scoreboard():
#     scoreboard_list = get_scoreboard_list()
#     homeTeamsList = []
#     for i in range(len(scoreboard_list)):
#         homeTeamsList.append(scoreboard_list[i]["homeTeam"])
#     return jsonify({'homeScoreboards': homeTeamsList})


# @app.route('/away_team_scoreboard')
# def get_away_team_scoreboard():
#     scoreboard_list = get_scoreboard_list()
#     awayTeamList = []
#     for i in range(len(scoreboard_list)):
#         awayTeamList.append(scoreboard_list[i]["awayTeam"])
#     return jsonify({'awayScoreboards': awayTeamList})


@app.route('/scoreboard')
def get_scoreboard():
    gameList = []
    scoreboard_response = get_scoreboard_list()
    for i in range(len(scoreboard_response)):
        game = {"home": scoreboard_response[i]["homeTeam"]["teamName"], 
            "away": scoreboard_response[i]["awayTeam"]["teamName"],
            "homeScore": scoreboard_response[i]["homeTeam"]["score"], "awayScore":scoreboard_response[i]["awayTeam"]["score"],
            "homeWL": f"{scoreboard_response[i]['homeTeam']['wins']}-{scoreboard_response[i]['homeTeam']['losses']}",
            "awayWL": f"{scoreboard_response[i]['awayTeam']['wins']}-{scoreboard_response[i]['awayTeam']['losses']}",
            "gameTime": scoreboard_response[i]["gameTimeUTC"],
            "gameCode": scoreboard_response[i]["gameCode"],
            "period": scoreboard_response[i]["period"],
            "gameClock": scoreboard_response[i]["gameClock"]}
        gameList.append(game)

    return jsonify({'scoreboard': gameList})


# @app.route('/predictions')
# def get_predictions():
#     with open(r"gnb_pca_model.pickle", "rb") as input_file:
#         model = pickle.load(input_file)

#     return jsonify({'predictions': model.predict(), "model_accuracy": None})
if __name__ == '__main__':
    app.run()