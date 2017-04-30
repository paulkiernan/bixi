#!/usr/bin/env python
# -*- coding: utf-8 -*-

""" BIXI909 Webserver

Super basic webserver for serving static assets for (hopefully) a bixi
simulator.
"""

# Standard Library Imports
import argparse
import logging
from logging.handlers import RotatingFileHandler

# Third Party Library Imports
import gevent
assert gevent  # Silence linting
from gevent.wsgi import WSGIServer

# Flask Imports
from flask import Flask
from flask import render_template

# Global Variables
APP = Flask(__name__)


@APP.route('/')
def index():
    return render_template('index.html')


@APP.route('/sim')
def simulator():
    return render_template('bixi.html')


def main():
    argument_parser = argparse.ArgumentParser(
        description=(
            "BIXI909 Webserver. Basic program for serving static assets for "
            "simulating lighting arrangements on our beloved Bixi."
        ),
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )
    argument_parser.add_argument(
        "--debug",
        default=False,
        action="store_true",
        help="Enable debug logging and handlers (including refresh).",
    )
    argument_parser.add_argument(
        "--gevent",
        default=False,
        action="store_true",
        help="Use greenlet backed threading model instead of Flask's.",
    )
    args = argument_parser.parse_args()

    APP.debug = args.debug

    if args.gevent:
        server = WSGIServer(("", 5000), APP)
        server.serve_forever()
    else:
        APP.run()

if __name__ == "__main__":
    main()
