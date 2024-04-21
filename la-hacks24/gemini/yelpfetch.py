#!/usr/bin/env python

"""
    Copyright (c) 2013, Triad National Security, LLC
    All rights reserved.

    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
    following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following
      disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the
      following disclaimer in the documentation and/or other materials provided with the distribution.
    * Neither the name of Triad National Security, LLC nor the names of its contributors may be used to endorse or
      promote products derived from this software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
    INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
    SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
    WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
"""

"""
    Example call:
        ./examples.py "[API Key]"
"""

# API KEY: fwMMyDgDHPhyaeIdsRlMKuQsxpThDvDig36aj8nyP__HXAoevMQ8yKbqONUxwIPS67VMihDpGCidiBMmocYL0dEVyttvKbIaxZbx1uGRu1tBrgAxluY5U6iq-jYkZnYx

from yelpapi import YelpAPI
import argparse
from pprint import pprint
import json

def save_response_to_json(response, filename):
    with open(filename, 'w') as f:
        json.dump(response, f, indent=4)

argparser = argparse.ArgumentParser(description='Example Yelp queries using yelpapi. '
                                                'Visit https://www.yelp.com/developers/v3/manage_app to get the '
                                                'necessary API keys.')
argparser.add_argument('api_key', type=str, help='Yelp Fusion API Key')
args = argparser.parse_args()

with YelpAPI(args.api_key) as yelp_api:
    """
        Example search by location text and term. 

        Search API: https://www.yelp.com/developers/documentation/v3/business_search
    """
    # print("ICE CREAM RECOMMENDATIONS")
    # response = yelp_api.search_query(term='ice cream', location='los angeles, ca', sort_by='rating', limit=)
    # pprint(response)
    # print('\n-------------------------------------------------------------------------\n')

    response = yelp_api.search_query(term='restaurants', location='los angeles, ca', sort_by='distance', limit=20)
    save_response_to_json(response, 'recommendations.json')