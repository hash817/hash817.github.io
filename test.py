import requests

def get_bitcoin_price():
    url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        bitcoin_price = data['bitcoin']['usd']
        return bitcoin_price
    else:
        print("Failed to fetch data. Status code:", response.status_code)
        return None

if __name__ == "__main__":
    bitcoin_price = get_bitcoin_price()
    if bitcoin_price is not None:
        print("Current Bitcoin Price (USD):", bitcoin_price)
    else:
        print("Failed to fetch Bitcoin price.")