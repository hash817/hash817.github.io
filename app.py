from flask import Flask, render_template
import requests

app = Flask(__name__)

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
    
@app.route('/')
def index():
    bitcoin_price = get_bitcoin_price()
    return render_template('index.html', bitcoin_price=bitcoin_price)

if __name__ == '__main__':
    app.run(debug=True)

