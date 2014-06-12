# The Grinder 3.11
# HTTP script recorded by TCPProxy at May 29, 2014 3:14:05 PM

import os
import uuid
import re
from net.grinder.script import Test
from net.grinder.script.Grinder import grinder
from net.grinder.plugin.http import HTTPPluginControl, HTTPRequest
from HTTPClient import NVPair
connectionDefaults = HTTPPluginControl.getConnectionDefaults()
httpUtilities = HTTPPluginControl.getHTTPUtilities()

SECURE = os.getenv('LOAD_SECURE', "yes") == "yes"
PROTOCOL = ('https' if SECURE else 'http')
APP_HOST = os.getenv('LOAD_APP_HOST', 'forio.com')
APP_ACCOUNT = os.getenv('LOAD_APP_ACCOUNT', 'showcase')
APP_PROJECT = os.getenv('LOAD_APP_PROJECT', 'route-optimizer')
APP_PATH = APP_ACCOUNT + '/' + APP_PROJECT
API_HOST = os.getenv('LOAD_API_HOST', 'api.forio.com')
STATIC_URL = PROTOCOL + '://' + APP_HOST

staticHeaders = [
  NVPair('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'),
  NVPair('Accept-Encoding', 'gzip,deflate,sdch'),
  NVPair('Accept-Language', 'en-US,en;q=0.8'),
  NVPair('Cache-Control', 'no-cache'),
  NVPair('Pragma', 'no-cache'),
  NVPair('Host', APP_HOST),
  NVPair('Referer', STATIC_URL),
  NVPair('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36'),
  NVPair('Connection', 'keep-alive')
]

apiHeaders = [
  NVPair('Accept', 'application/json, text/javascript, */*; q=0.01'),
  NVPair('Accept-Encoding', 'gzip,deflate,sdch'),
  NVPair('Accept-Language', 'en-US,en;q=0.8'),
  NVPair('Connection', 'keep-alive'),
  NVPair('Content-Type', 'application/json'),
  NVPair('Host', API_HOST),
  NVPair('Origin', STATIC_URL),
  NVPair('Referer', STATIC_URL),
  NVPair('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36')
]

matcher = re.compile('.*"id":\s*"([^"]+)".*')

def createRequest(test, url, headers=staticHeaders):
    """Create an instrumented HTTPRequest."""
    request = HTTPRequest(url=url)
    if headers: request.headers=headers
    test.record(request, HTTPRequest.getHttpMethodFilter())
    return request

# These definitions at the top level of the file are evaluated once,
# when the worker process is started.

url0 = STATIC_URL
url1 = PROTOCOL + '://' + API_HOST

request101 = createRequest(Test(101, 'GET /'), url0)

request102 = createRequest(Test(102, 'GET jquery.min.js'), url0)

request103 = createRequest(Test(103, 'GET main.css'), url0)

request104 = createRequest(Test(104, 'GET lodash.min.js'), url0)

request105 = createRequest(Test(105, 'GET d3.min.js'), url0)

request106 = createRequest(Test(106, 'GET backbone.js'), url0)

request107 = createRequest(Test(107, 'GET ZeroClipboard.min.js'), url0)

request108 = createRequest(Test(108, 'GET contour.min.js'), url0)

request109 = createRequest(Test(109, 'GET app.js'), url0)

request201 = createRequest(Test(201, 'GET epicenter-logo.svg'), url0)

request301 = createRequest(Test(301, 'GET mandelbrot-logo.svg'), url0)

request401 = createRequest(Test(401, 'GET contour-logo.svg'), url0)

request501 = createRequest(Test(501, 'GET julia.svg'), url0)

request601 = createRequest(Test(601, 'GET opensource-logo.svg'), url0)

request701 = createRequest(Test(701, 'GET map.svg'), url0)

request801 = createRequest(Test(801, 'GET logo-white.svg'), url0)

request901 = createRequest(Test(901, 'GET logo.svg'), url0)

request1001 = createRequest(Test(1001, 'GET book-crawl.json'), url0)

request1101 = createRequest(Test(1101, 'GET ss-social-regular.woff'), url0)

request1201 = createRequest(Test(1201, 'GET ss-symbolicons-block.woff'), url0)

request1301 = createRequest(Test(1301, 'GET ZeroClipboard.swf'), url0)

request1302 = createRequest(Test(1302, 'GET marker-sprite-shadow.png'), url0)

request1401 = createRequest(Test(1401, 'OPTIONS run'), url1, apiHeaders)

request1501 = createRequest(Test(1501, 'POST run'), url1, apiHeaders)

request1601 = createRequest(Test(1601, 'OPTIONS {{run.id}}'), url1, apiHeaders)

request1701 = createRequest(Test(1701, 'POST {{run.id}}'), url1, apiHeaders)

request1801 = createRequest(Test(1801, 'GET custom.json'), url0)

request1901 = createRequest(Test(1901, 'POST {{run.id}}'), url1, apiHeaders)

request2001 = createRequest(Test(2001, 'OPTIONS routes'), url1, apiHeaders)

request2101 = createRequest(Test(2101, 'POST routes'), url1, apiHeaders)

request2201 = createRequest(Test(2201, 'GET {{route.id}}'), url1, apiHeaders)

request2301 = createRequest(Test(2301, 'POST {{run.id}}'), url1, apiHeaders)

request2401 = createRequest(Test(2401, 'GET business-deliver.json'), url0)

request2501 = createRequest(Test(2501, 'POST {{run.id}}'), url1, apiHeaders)

request2601 = createRequest(Test(2601, 'POST routes'), url1, apiHeaders)

request2701 = createRequest(Test(2701, 'GET {{route.id}}'), url1, apiHeaders)

request2801 = createRequest(Test(2801, 'POST {{run.id}}'), url1, apiHeaders)


class TestRunner:
  """A TestRunner instance is created for each worker thread."""

  # A method for each recorded page.
  def page1(self):
    """GET / (requests 101-109)."""
    result = request101.GET('/app/' + APP_PATH)
    self.token_family = \
      httpUtilities.valueFromBodyURI('family') # 'Open+Sans:300'

    grinder.sleep(39)
    request102.GET('/app/' + APP_PATH + '/vendor/jquery/dist/jquery.min.js')

    request103.GET('/app/' + APP_PATH + '/styles/main.css')

    request104.GET('/app/' + APP_PATH + '/vendor/lodash/dist/lodash.min.js')

    request105.GET('/app/' + APP_PATH + '/vendor/d3/d3.min.js')

    request106.GET('/app/' + APP_PATH + '/vendor/backbone/backbone.js')

    request107.GET('/app/' + APP_PATH + '/vendor/zeroclipboard/ZeroClipboard.min.js')

    grinder.sleep(34)
    request108.GET('/app/' + APP_PATH + '/vendor/contour/dist/contour.min.js')

    request109.GET('/app/' + APP_PATH + '/scripts/app.js')

    return result

  def page2(self):
    """GET epicenter-logo.svg (request 201)."""
    result = request201.GET('/app/' + APP_PATH + '/styles/assets/logos/epicenter-logo.svg')

    return result

  def page3(self):
    """GET mandelbrot-logo.svg (request 301)."""
    result = request301.GET('/app/' + APP_PATH + '/styles/assets/logos/mandelbrot-logo.svg')

    return result

  def page4(self):
    """GET contour-logo.svg (request 401)."""
    result = request401.GET('/app/' + APP_PATH + '/styles/assets/logos/contour-logo.svg')

    return result

  def page5(self):
    """GET julia.svg (request 501)."""
    result = request501.GET('/app/' + APP_PATH + '/styles/assets/logos/julia.svg')

    return result

  def page6(self):
    """GET opensource-logo.svg (request 601)."""
    result = request601.GET('/app/' + APP_PATH + '/styles/assets/logos/opensource-logo.svg')

    return result

  def page7(self):
    """GET map.svg (request 701)."""
    result = request701.GET('/app/' + APP_PATH + '/styles/assets/logos/map.svg')

    return result

  def page8(self):
    """GET logo-white.svg (request 801)."""
    result = request801.GET('/app/' + APP_PATH + '/styles/assets/logo-white.svg')

    return result

  def page9(self):
    """GET logo.svg (request 901)."""
    result = request901.GET('/app/' + APP_PATH + '/styles/assets/logo.svg')

    return result

  def page10(self):
    """GET book-crawl.json (request 1001)."""
    result = request1001.GET('/app/' + APP_PATH + '/data/book-crawl.json')

    return result

  def page11(self):
    """GET ss-social-regular.woff (request 1101)."""
    result = request1101.GET('/app/' + APP_PATH + '/styles/assets/fonts/ss-social/ss-social-regular.woff')

    return result

  def page12(self):
    """GET ss-symbolicons-block.woff (request 1201)."""
    result = request1201.GET('/app/' + APP_PATH + '/styles/assets/fonts/symbolicons/ss-symbolicons-block.woff')

    return result

  def page13(self):
    """GET ZeroClipboard.swf (requests 1301-1302)."""
    self.token_noCache = \
      '1402596761565'
    result = request1301.GET('/app/' + APP_PATH + '/vendor/zeroclipboard/ZeroClipboard.swf' +
      '?noCache=' +
      self.token_noCache)

    grinder.sleep(691)
    request1302.GET('/app/' + APP_PATH + '/styles/assets/marker-sprite-shadow.png')

    return result

  def page14(self):
    """OPTIONS run (request 1401)."""
    result = request1401.OPTIONS('/model/run',
      '''0\r\n\r\n''')

    return result

  def page15(self):
    """POST run (request 1501)."""
    result = request1501.POST('/model/run',
      '{\"account\":\"' + APP_ACCOUNT + '\",\"project\":\"' + APP_PROJECT + '\",\"model\":\"TSPModel.jl\"}')

    return result

  def page16(self, run):
    """OPTIONS {{run.id}} (request 1601)."""
    result = request1601.OPTIONS('/model/operation/' + run,
      '''0\r\n\r\n''')

    return result

  def page17(self, run):
    """POST {{run.id}} (request 1701)."""
    result = request1701.POST('/model/operation/' + run,
      '{\"name\":\"solve\",\"arguments\":[[[0,2449,3433,5656,1584,2994,5198,8013,3829],[1840,0,1247,5898,2455,4450,5454,9468,5285],[3074,1441,0,6532,3387,5688,4928,14320,7006],[5415,4986,5943,0,3606,4246,2589,7557,2759],[1808,2462,3855,4495,0,2656,4050,7674,3609],[2854,4407,5192,4666,2700,0,4681,5672,2320],[5506,4923,5252,2864,3698,4589,0,9252,4454],[8101,9654,13904,8282,7947,5247,9642,0,4904],[4476,5450,6545,2673,3893,2220,4480,5374,0]]]}')

    return result

  def page18(self):
    """GET custom.json (request 1801)."""
    result = request1801.GET('/app/' + APP_PATH + '/data/custom.json')

    return result

  def page19(self, run):
    """POST {{run.id}} (request 1901)."""
    result = request1901.POST('/model/operation/' + run,
      '{\"name\":\"solve\",\"arguments\":[[[0,1072,394,2472,8560,2216,634,2490],[1605,0,1343,1753,7469,1743,1583,3439],[263,1430,0,2116,8710,2757,240,2097],[2198,1420,1936,0,8168,2974,2176,3076],[8698,7279,8435,8471,0,6256,8675,10953],[2859,1855,2597,3618,6251,0,2837,4698],[15,1087,408,2487,8575,2231,0,2505],[2261,3148,2657,3021,11109,4475,2239,0]]]}')

    return result

  def page20(self):
    """OPTIONS routes (request 2001)."""
    result = request2001.OPTIONS('/data/' + APP_PATH + '/routes',
      '''0\r\n\r\n''')

    return result

  def page21(self):
    """POST routes (request 2101)."""
    result = request2101.POST('/data/' + APP_PATH + '/routes',
      '{\"routeName\":\"Fun Saturday\",\"waypoints\":[{\"name\":\"Forio\",\"latitude\":37.776861,\"longitude\":-122.410573},{\"name\":\"San Francisco City Hall\",\"latitude\":37.779318,\"longitude\":-122.41913999999997},{\"name\":\"City Beer Store\",\"latitude\":37.775724,\"longitude\":-122.40959199999998},{\"name\":\"Nob Hill Grille\",\"latitude\":37.789876,\"longitude\":-122.41738499999997},{\"name\":\"Golden Gate Park\",\"latitude\":37.769421,\"longitude\":-122.48621400000002},{\"name\":\"Toronado\",\"latitude\":37.771826,\"longitude\":-122.431196},{\"name\":\"Cellarmaker Brewing Co.\",\"latitude\":37.777171,\"longitude\":-122.41073},{\"name\":\"21st Amendment Brewery\",\"latitude\":37.782431,\"longitude\":-122.39258999999998}]}')

    return result

  def page22(self, route):
    """GET {{route.id}} (request 2201)."""
    result = request2201.GET('/data/' + APP_PATH + '/routes/' + route)

    return result

  def page23(self, run):
    """POST {{run.id}} (request 2301)."""
    result = request2301.POST('/model/operation/' + run,
      '{\"name\":\"solve\",\"arguments\":[[[0,1072,394,2472,8560,2216,634,2490],[1605,0,1343,1753,7469,1743,1583,3439],[263,1430,0,2116,8710,2757,240,2097],[2198,1420,1936,0,8168,2974,2176,3076],[8698,7279,8435,8471,0,6256,8675,10953],[2859,1855,2597,3618,6251,0,2837,4698],[15,1087,408,2487,8575,2231,0,2505],[2261,3148,2657,3021,11109,4475,2239,0]]]}')

    return result

  def page24(self):
    """GET business-deliver.json (request 2401)."""
    result = request2401.GET('/app/' + APP_PATH + '/data/business-deliver.json')

    return result

  def page25(self, run):
    """POST {{run.id}} (request 2501)."""
    result = request2501.POST('/model/operation/' + run,
      '{\"name\":\"solve\",\"arguments\":[[[0,2197,6196,9802,3163,5217,5657,9397,4233],[2191,0,8253,11153,966,5858,6421,9400,5584],[6260,7611,0,6540,7053,1079,1085,4521,4414],[9950,11301,6540,0,11226,7126,7249,10277,5868],[2911,722,7604,10705,0,5208,5772,8750,4389],[5262,6613,1105,7122,5983,0,1550,5626,3416],[5646,6995,997,7345,6144,1605,0,4028,4725],[9762,9265,4330,10474,8903,5409,3991,0,8339],[4341,5692,3945,5596,5451,2922,4508,8467,0]]]}')

    return result

  def page26(self):
    """POST routes (request 2601)."""
    result = request2601.POST('/data/' + APP_PATH + '/routes',
      '{\"routeName\":\"Lunch and Errands\",\"waypoints\":[{\"name\":\"Forio\",\"latitude\":37.776861,\"longitude\":-122.410573},{\"name\":\"Kimberly Mitchell, DDS Inc.\",\"latitude\":37.788292,\"longitude\":-122.40975300000002},{\"name\":\"USPS\",\"latitude\":37.781786,\"longitude\":-122.418836},{\"name\":\"BrainWash\",\"latitude\":37.776374,\"longitude\":-122.408706}]}')

    return result

  def page27(self, route):
    """GET {{route.id}} (request 2701)."""
    result = request2701.GET('/data/' + APP_PATH + '/routes/' + route)

    return result

  def page28(self, run):
    """POST {{run.id}} (request 2801)."""
    result = request2801.POST('/model/operation/' + run,
      '{\"name\":\"solve\",\"arguments\":[[[0,2542,1348,1013],[1988,0,1708,2063],[1638,1482,0,1713],[446,1785,1404,0]]]}')

    return result

  def __call__(self):
    """Called for every run performed by the worker thread."""
    self.page1()      # GET / (requests 101-109)

    grinder.sleep(245)
    self.page2()      # GET epicenter-logo.svg (request 201)
    self.page3()      # GET mandelbrot-logo.svg (request 301)
    self.page4()      # GET contour-logo.svg (request 401)
    self.page5()      # GET julia.svg (request 501)
    self.page6()      # GET opensource-logo.svg (request 601)
    self.page7()      # GET map.svg (request 701)
    self.page8()      # GET logo-white.svg (request 801)

    grinder.sleep(36)
    self.page9()      # GET logo.svg (request 901)

    grinder.sleep(43)
    self.page10()     # GET book-crawl.json (request 1001)
    self.page11()     # GET ss-social-regular.woff (request 1101)
    self.page12()     # GET ss-symbolicons-block.woff (request 1201)

    grinder.sleep(230)
    self.page13()     # GET ZeroClipboard.swf (requests 1301-1302)

    grinder.sleep(4581)
    self.page14()     # OPTIONS run (request 1401)

    grinder.sleep(100)

    json = self.page15().text     # POST run (request 1501)
    run = matcher.match(json).group(1)

    grinder.logger.info(run)

    grinder.sleep(96)
    self.page16(run)     # OPTIONS {{run.id}} (request 1601)

    grinder.sleep(89)
    self.page17(run)     # POST {{run.id}} (request 1701)

    grinder.sleep(22776)
    self.page18()     # GET custom.json (request 1801)

    grinder.sleep(69582)
    self.page19(run)     # POST {{run.id}} (request 1901)

    grinder.sleep(13621)
    self.page20()     # OPTIONS routes (request 2001)

    grinder.sleep(90)

    json = self.page21().text     # POST routes (request 2101)
    route = matcher.match(json).group(1)

    grinder.logger.info(route)

    grinder.sleep(95)
    self.page22(route)     # GET {{route.id}} (request 2201)

    grinder.sleep(7673)
    self.page23(run)     # POST {{run.id}} (request 2301)

    grinder.sleep(18150)
    self.page24()     # GET business-deliver.json (request 2401)

    grinder.sleep(3821)
    self.page25(run)     # POST {{run.id}} (request 2501)

    grinder.sleep(36022)

    json = self.page26().text     # POST routes (request 2601)
    route = matcher.match(json).group(1)

    grinder.logger.info(route)

    grinder.sleep(104)
    self.page27(route)     # GET {{route.id}} (request 2701)

    grinder.sleep(1689)
    self.page28(run)     # POST {{run.id}} (request 2801)


# Instrument page methods.
Test(100, 'Page 1').record(TestRunner.page1)
Test(200, 'Page 2').record(TestRunner.page2)
Test(300, 'Page 3').record(TestRunner.page3)
Test(400, 'Page 4').record(TestRunner.page4)
Test(500, 'Page 5').record(TestRunner.page5)
Test(600, 'Page 6').record(TestRunner.page6)
Test(700, 'Page 7').record(TestRunner.page7)
Test(800, 'Page 8').record(TestRunner.page8)
Test(900, 'Page 9').record(TestRunner.page9)
Test(1000, 'Page 10').record(TestRunner.page10)
Test(1100, 'Page 11').record(TestRunner.page11)
Test(1200, 'Page 12').record(TestRunner.page12)
Test(1300, 'Page 13').record(TestRunner.page13)
Test(1400, 'Page 14').record(TestRunner.page14)
Test(1500, 'Page 15').record(TestRunner.page15)
Test(1600, 'Page 16').record(TestRunner.page16)
Test(1700, 'Page 17').record(TestRunner.page17)
Test(1800, 'Page 18').record(TestRunner.page18)
Test(1900, 'Page 19').record(TestRunner.page19)
Test(2000, 'Page 20').record(TestRunner.page20)
Test(2100, 'Page 21').record(TestRunner.page21)
Test(2200, 'Page 22').record(TestRunner.page22)
Test(2300, 'Page 23').record(TestRunner.page23)
Test(2400, 'Page 24').record(TestRunner.page24)
Test(2500, 'Page 25').record(TestRunner.page25)
Test(2600, 'Page 26').record(TestRunner.page26)
Test(2700, 'Page 27').record(TestRunner.page27)
Test(2800, 'Page 28').record(TestRunner.page28)
