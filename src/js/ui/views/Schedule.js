import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {helpers} from '../../common';
import {setTitle} from '../util';
import {Dropdown, NewWindowLink} from '../components';

const Schedule = ({abbrev, completed, season, upcoming}) => {
    setTitle('Schedule');

    return <div>
        <Dropdown view="schedule" fields={["teams"]} values={[abbrev]} />
        <h1>Schedule <NewWindowLink /></h1>

        <div className="row">
            <div className="col-sm-6">
                <h2>Upcoming Games</h2>
                <ul className="list-group">
                    {upcoming.map(({gid, teams}) => <li className="list-group-item schedule-row" key={gid}>
                        <a href={helpers.leagueUrl(['roster', teams[0].abbrev])}>{teams[0].region}</a> <span className="schedule-extra">({teams[0].seasonAttrs.won}-{teams[0].seasonAttrs.lost})</span>
                        <span className="schedule-at"> @ </span>
                        <a href={helpers.leagueUrl(['roster', teams[1].abbrev])}>{teams[1].region}</a> <span className="schedule-extra">({teams[1].seasonAttrs.won}-{teams[1].seasonAttrs.lost})</span>
                    </li>)}
                </ul>
            </div>
            <div className="col-sm-6 hidden-xs">
                <h2>Completed Games</h2>
                <ul className="list-group">
                    {completed === undefined ? 'Loading...' : completed.map(({gid, overtime, score, teams, won}) => {
                        const classes = classNames('list-group-item', 'schedule-row', {
                            'list-group-item-success': won,
                            'list-group-item-danger': !won,
                        });
                        return <li className={classes} key={gid}>
                            <div className="schedule-results">
                                <div className="schedule-wl">{won ? 'W' : 'L'}</div>
                                <div className="schedule-score">
                                    <a href={helpers.leagueUrl(['game_log', abbrev, season, gid])}>{score}{overtime}</a>
                                </div>
                            </div>
                            <a href={helpers.leagueUrl(['roster', teams[0].abbrev])}>{teams[0].region}</a>
                            <span className="schedule-at"> @ </span>
                            <a href={helpers.leagueUrl(['roster', teams[1].abbrev])}>{teams[1].region}</a>
                        </li>;
                    })}
                </ul>
            </div>
        </div>
    </div>;
};

Schedule.propTypes = {
    abbrev: PropTypes.string.isRequired,
    completed: PropTypes.arrayOf(PropTypes.object),
    season: PropTypes.number.isRequired,
    upcoming: PropTypes.arrayOf(PropTypes.shape({
        gid: PropTypes.number.isRequired,
        teams: PropTypes.arrayOf(PropTypes.shape({
            abbrev: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            region: PropTypes.string.isRequired,
            seasonAttrs: PropTypes.shape({
                lost: PropTypes.number.isRequired,
                won: PropTypes.number.isRequired,
            }).isRequired,
        })).isRequired,
    })).isRequired,
};

export default Schedule;
