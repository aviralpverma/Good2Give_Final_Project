package com.app.utils;

public class Utils {

	public final static double AVERAGE_RADIUS_OF_EARTH_KM = 6371;

	public static int calculateDistanceInKilometer(double userLat, double userLng, double orgLat, double orgLng) {

		double latDistance = Math.toRadians(userLat - orgLat);
		double lngDistance = Math.toRadians(userLng - orgLng);

		double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2) + Math.cos(Math.toRadians(userLat))
				* Math.cos(Math.toRadians(orgLat)) * Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);

		double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return (int) (Math.round(AVERAGE_RADIUS_OF_EARTH_KM * c));
	}
}
