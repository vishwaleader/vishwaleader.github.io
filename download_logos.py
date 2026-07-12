import urllib.request
import os

logos = {
    'visa.svg': 'https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg',
    'mastercard.svg': 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
    'amex.svg': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg',
    'rupay.png': 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Rupay-Logo.png',
    'gpay.svg': 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg',
    'paytm.svg': 'https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg',
    'phonepe.png': 'https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png',
    'amazonpay.svg': 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Amazon-pay-logo.svg',
    'bhim.svg': 'https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg',
    'applepay.svg': 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg',
    'swift.svg': 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Swift_logo.svg',
    'sepa.svg': 'https://upload.wikimedia.org/wikipedia/commons/e/ea/SEPA-Logo.svg'
}

req = urllib.request.build_opener()
req.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')]
urllib.request.install_opener(req)

for name, url in logos.items():
    try:
        urllib.request.urlretrieve(url, 'public/assets/logos/' + name)
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed {name}: {e}")
