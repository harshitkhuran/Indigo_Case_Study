from flask import Blueprint, jsonify
from .services import get_mock_flight_status
from .. import socketio

main = Blueprint('main', __name__)


@main.route('/api/flight-status')
def flight_status():
    status = get_mock_flight_status()
    return jsonify(status)


@socketio.on('connect')
def handle_connect():
    status = get_mock_flight_status()
    socketio.emit('flightStatus', status)
