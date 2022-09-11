interface IDataStorage {
    getData(key: string): string;
    postData(key: string, dataAsString: string): void;
}

class LocalStorageDataService implements IDataStorage {
    getData(key: string): string {
        return localStorage.getItem(key) || '';
    }

    postData(key: string, dataAsString: string) {
        localStorage.setItem(key, dataAsString)
    }
}