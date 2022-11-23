import geocoder
import socket
import requests
from geopy.distance import geodesic


class GeoLocation():
    def __get_ip(self):
        response = requests.get('https://api64.ipify.org?format=json').json()
        return response["ip"]

    def get_location(self):
        ip_address = self.__get_ip()
        response = requests.get(f'https://ipapi.co/{ip_address}/json/').json()
        location_data = {
            "ip": ip_address,
            "city": response.get("city"),
            "region": response.get("region"),
            "country": response.get("country_name"),
            "latitude": response.get("latitude"),
            "longitude": response.get("longitude"),
        }
        return location_data

    def get_distance(self, u_lat, u_long,  s_lat, s_long):
        origin = (u_lat,  u_long)
        distance = (s_lat, s_long)

        return geodesic(origin, distance).miles


geoloc = GeoLocation()
