import urllib.request
import os

reqs = [
    ('amazon-pay.svg', 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Amazon-pay-logo.svg'),
    ('sepa.svg', 'https://upload.wikimedia.org/wikipedia/commons/e/ea/SEPA-Logo.svg'),
    ('phonepe-icon.svg', 'https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg'),
    ('mobikwik.png', 'https://download.logo.wine/logo/MobiKwik/MobiKwik-Logo.wine.png')
]

opener = urllib.request.build_opener()
opener.addheaders = [('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36')]
urllib.request.install_opener(opener)

for name, url in reqs:
    try:
        urllib.request.urlretrieve(url, 'public/assets/logos/' + name)
        print(f"Success: {name}")
    except Exception as e:
        print(f"Error for {name}: {e}")
