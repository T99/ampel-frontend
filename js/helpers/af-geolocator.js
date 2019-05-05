/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:16 AM -- January 27th, 2019.
 *	Website: dashboard.ampelfeedback.com
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Allows geolocating if enabled by the user.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
class AFGeolocator {
    static isSupported() {
        return ("geolocation" in navigator);
    }
    static hasPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                navigator.geolocation.getCurrentPosition(() => resolve(true), () => resolve(false));
            });
        });
    }
    static getPosition() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition((position) => resolve(position), () => reject());
            });
        });
    }
    static getLatitude() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition((position) => resolve(position.coords.latitude), () => reject());
            });
        });
    }
    static getLongitude() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition((position) => resolve(position.coords.longitude), () => reject());
            });
        });
    }
}
export default AFGeolocator;
//# sourceMappingURL=af-geolocator.js.map