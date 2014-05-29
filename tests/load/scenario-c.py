# The Grinder 3.11
# HTTP script recorded by TCPProxy at May 29, 2014 3:20:14 PM

from net.grinder.script import Test
from net.grinder.script.Grinder import grinder
from net.grinder.plugin.http import HTTPPluginControl, HTTPRequest
from HTTPClient import NVPair
connectionDefaults = HTTPPluginControl.getConnectionDefaults()
httpUtilities = HTTPPluginControl.getHTTPUtilities()

# To use a proxy server, uncomment the next line and set the host and port.
# connectionDefaults.setProxyServer("localhost", 8001)

def createRequest(test, url, headers=None):
    """Create an instrumented HTTPRequest."""
    request = HTTPRequest(url=url)
    if headers: request.headers=headers
    test.record(request, HTTPRequest.getHttpMethodFilter())
    return request

# These definitions at the top level of the file are evaluated once,
# when the worker process is started.

url0 = 'http://localhost:9002'
url1 = 'http://api.forio.com:80'

request101 = createRequest(Test(101, 'GET /'), url0)

request102 = createRequest(Test(102, 'GET jquery.min.js'), url0)

request103 = createRequest(Test(103, 'GET lodash.min.js'), url0)

request104 = createRequest(Test(104, 'GET d3.min.js'), url0)

request105 = createRequest(Test(105, 'GET backbone.js'), url0)

request106 = createRequest(Test(106, 'GET contour.min.js'), url0)

request107 = createRequest(Test(107, 'GET app.js'), url0)

request108 = createRequest(Test(108, 'GET main.css'), url0)

request201 = createRequest(Test(201, 'GET epicenter-logo.svg'), url0)

request301 = createRequest(Test(301, 'GET mandelbrot-logo.svg'), url0)

request401 = createRequest(Test(401, 'GET contour-logo.svg'), url0)

request501 = createRequest(Test(501, 'GET julia.svg'), url0)

request601 = createRequest(Test(601, 'GET opensource-logo.svg'), url0)

request701 = createRequest(Test(701, 'GET logo-white.svg'), url0)

request801 = createRequest(Test(801, 'GET map.svg'), url0)

request901 = createRequest(Test(901, 'GET logo.svg'), url0)

request1001 = createRequest(Test(1001, 'GET book-crawl.json'), url0)

request1101 = createRequest(Test(1101, 'GET ss-symbolicons-block.woff'), url0)

request1102 = createRequest(Test(1102, 'GET marker-sprite-shadow.png'), url0)

request1201 = createRequest(Test(1201, 'GET /'), url0)

request1202 = createRequest(Test(1202, 'GET jquery.min.js'), url0)

request1203 = createRequest(Test(1203, 'GET main.css'), url0)

request1204 = createRequest(Test(1204, 'GET lodash.min.js'), url0)

request1205 = createRequest(Test(1205, 'GET d3.min.js'), url0)

request1206 = createRequest(Test(1206, 'GET backbone.js'), url0)

request1207 = createRequest(Test(1207, 'GET contour.min.js'), url0)

request1208 = createRequest(Test(1208, 'GET app.js'), url0)

request1301 = createRequest(Test(1301, 'GET epicenter-logo.svg'), url0)

request1401 = createRequest(Test(1401, 'GET mandelbrot-logo.svg'), url0)

request1501 = createRequest(Test(1501, 'GET contour-logo.svg'), url0)

request1601 = createRequest(Test(1601, 'GET julia.svg'), url0)

request1701 = createRequest(Test(1701, 'GET opensource-logo.svg'), url0)

request1801 = createRequest(Test(1801, 'GET map.svg'), url0)

request1901 = createRequest(Test(1901, 'GET logo-white.svg'), url0)

request2001 = createRequest(Test(2001, 'GET logo.svg'), url0)

request2101 = createRequest(Test(2101, 'GET book-crawl.json'), url0)

request2201 = createRequest(Test(2201, 'GET ss-symbolicons-block.woff'), url0)

request2202 = createRequest(Test(2202, 'GET marker-sprite-shadow.png'), url0)

request2301 = createRequest(Test(2301, 'OPTIONS run'), url1)

request2401 = createRequest(Test(2401, 'POST run'), url1)

request2501 = createRequest(Test(2501, 'GET contour.min.map'), url0)

request2601 = createRequest(Test(2601, 'GET jquery.min.map'), url0)

request2701 = createRequest(Test(2701, 'OPTIONS a8e5cdbf-c5f1-4001-904c-4f00468197b6'), url1)

request2801 = createRequest(Test(2801, 'POST a8e5cdbf-c5f1-4001-904c-4f00468197b6'), url1)

request2901 = createRequest(Test(2901, 'GET custom.json'), url0)

request2902 = createRequest(Test(2902, 'GET marker-sprite-shadow.png'), url0)

request3001 = createRequest(Test(3001, 'POST a8e5cdbf-c5f1-4001-904c-4f00468197b6'), url1)


class TestRunner:
  """A TestRunner instance is created for each worker thread."""

  # A method for each recorded page.
  def page1(self):
    """GET / (requests 101-108)."""
    result = request101.GET('/')

    grinder.sleep(43)
    request102.GET('/vendor/jquery/dist/jquery.min.js')

    request103.GET('/vendor/lodash/dist/lodash.min.js')

    request104.GET('/vendor/d3/d3.min.js')

    request105.GET('/vendor/backbone/backbone.js')

    request106.GET('/vendor/contour/dist/contour.min.js')

    request107.GET('/scripts/app.js')

    request108.GET('/styles/main.css')

    return result

  def page2(self):
    """GET epicenter-logo.svg (request 201)."""
    result = request201.GET('/styles/assets/logos/epicenter-logo.svg')

    return result

  def page3(self):
    """GET mandelbrot-logo.svg (request 301)."""
    result = request301.GET('/styles/assets/logos/mandelbrot-logo.svg')

    return result

  def page4(self):
    """GET contour-logo.svg (request 401)."""
    result = request401.GET('/styles/assets/logos/contour-logo.svg')

    return result

  def page5(self):
    """GET julia.svg (request 501)."""
    result = request501.GET('/styles/assets/logos/julia.svg')

    return result

  def page6(self):
    """GET opensource-logo.svg (request 601)."""
    result = request601.GET('/styles/assets/logos/opensource-logo.svg')

    return result

  def page7(self):
    """GET logo-white.svg (request 701)."""
    result = request701.GET('/styles/assets/logo-white.svg')

    return result

  def page8(self):
    """GET map.svg (request 801)."""
    result = request801.GET('/styles/assets/logos/map.svg')

    return result

  def page9(self):
    """GET logo.svg (request 901)."""
    result = request901.GET('/styles/assets/logo.svg')

    return result

  def page10(self):
    """GET book-crawl.json (request 1001)."""
    result = request1001.GET('/data/book-crawl.json')

    return result

  def page11(self):
    """GET ss-symbolicons-block.woff (requests 1101-1102)."""
    result = request1101.GET('/styles/assets/fonts/symbolicons/ss-symbolicons-block.woff')

    grinder.sleep(346)
    request1102.GET('/styles/assets/marker-sprite-shadow.png')

    return result

  def page12(self):
    """GET / (requests 1201-1208)."""
    result = request1201.GET('/')
    self.token_family = \
      httpUtilities.valueFromBodyURI('family') # 'Open+Sans:300'

    grinder.sleep(38)
    request1202.GET('/vendor/jquery/dist/jquery.min.js')

    request1203.GET('/styles/main.css')

    request1204.GET('/vendor/lodash/dist/lodash.min.js')

    request1205.GET('/vendor/d3/d3.min.js')

    request1206.GET('/vendor/backbone/backbone.js')

    request1207.GET('/vendor/contour/dist/contour.min.js')

    request1208.GET('/scripts/app.js')

    return result

  def page13(self):
    """GET epicenter-logo.svg (request 1301)."""
    result = request1301.GET('/styles/assets/logos/epicenter-logo.svg')

    return result

  def page14(self):
    """GET mandelbrot-logo.svg (request 1401)."""
    result = request1401.GET('/styles/assets/logos/mandelbrot-logo.svg')

    return result

  def page15(self):
    """GET contour-logo.svg (request 1501)."""
    result = request1501.GET('/styles/assets/logos/contour-logo.svg')

    return result

  def page16(self):
    """GET julia.svg (request 1601)."""
    result = request1601.GET('/styles/assets/logos/julia.svg')

    return result

  def page17(self):
    """GET opensource-logo.svg (request 1701)."""
    result = request1701.GET('/styles/assets/logos/opensource-logo.svg')

    return result

  def page18(self):
    """GET map.svg (request 1801)."""
    result = request1801.GET('/styles/assets/logos/map.svg')

    return result

  def page19(self):
    """GET logo-white.svg (request 1901)."""
    result = request1901.GET('/styles/assets/logo-white.svg')

    return result

  def page20(self):
    """GET logo.svg (request 2001)."""
    result = request2001.GET('/styles/assets/logo.svg')

    return result

  def page21(self):
    """GET book-crawl.json (request 2101)."""
    result = request2101.GET('/data/book-crawl.json')

    return result

  def page22(self):
    """GET ss-symbolicons-block.woff (requests 2201-2202)."""
    result = request2201.GET('/styles/assets/fonts/symbolicons/ss-symbolicons-block.woff')

    grinder.sleep(526)
    request2202.GET('/styles/assets/marker-sprite-shadow.png')

    return result

  def page23(self):
    """OPTIONS run (request 2301)."""
    result = request2301.OPTIONS('/model/run',
      '''0\r\n\r\n''')

    return result

  def page24(self):
    """POST run (request 2401)."""
    result = request2401.POST('/model/run',
      '{\"account\":\"showcase\",\"project\":\"route-optimizer\",\"model\":\"TSPModel.jl\"}')

    return result

  def page25(self):
    """GET contour.min.map (request 2501)."""
    result = request2501.GET('/vendor/contour/dist/dist/contour.min.map')

    return result

  def page26(self):
    """GET jquery.min.map (request 2601)."""
    result = request2601.GET('/vendor/jquery/dist/jquery.min.map')

    return result

  def page27(self):
    """OPTIONS a8e5cdbf-c5f1-4001-904c-4f00468197b6 (request 2701)."""
    result = request2701.OPTIONS('/model/operation/a8e5cdbf-c5f1-4001-904c-4f00468197b6',
      '''0\r\n\r\n''')

    return result

  def page28(self):
    """POST a8e5cdbf-c5f1-4001-904c-4f00468197b6 (request 2801)."""
    result = request2801.POST('/model/operation/a8e5cdbf-c5f1-4001-904c-4f00468197b6',
      '{\"name\":\"solve\",\"arguments\":[[[0,2449,3433,5656,1584,2994,5198,8013,3829],[1840,0,1247,5898,2455,4450,5454,9468,5285],[3056,1441,0,6532,3671,5688,4928,14670,6522],[5415,4986,5943,0,3606,4246,2589,7557,2759],[1808,2462,3855,4495,0,2656,4050,7674,3609],[2839,4407,5192,4666,2700,0,4681,5672,2320],[5506,4923,5252,2864,3698,4589,0,9252,4454],[8086,9654,13904,8282,7947,5247,9642,0,4904],[4476,5761,6545,2673,3893,2220,4480,5374,0]]]}')

    return result

  def page29(self):
    """GET custom.json (requests 2901-2902)."""
    result = request2901.GET('/data/custom.json')

    grinder.sleep(73062)
    request2902.GET('/styles/assets/marker-sprite-shadow.png')

    return result

  def page30(self):
    """POST a8e5cdbf-c5f1-4001-904c-4f00468197b6 (request 3001)."""
    result = request3001.POST('/model/operation/a8e5cdbf-c5f1-4001-904c-4f00468197b6',
      '{\"name\":\"solve\",\"arguments\":[[[0,2015,2811,2040,18846,1842,19769],[2060,0,3118,3444,19987,3244,20909],[3457,3113,0,4841,21581,3516,22504],[2053,3519,5866,0,16607,2451,17530],[18302,19754,22062,17168,0,20130,1396],[2008,3340,3670,2170,18835,0,19758],[18117,19569,21877,16983,1396,19945,0]]]}')

    return result

  def __call__(self):
    """Called for every run performed by the worker thread."""
    self.page1()      # GET / (requests 101-108)

    grinder.sleep(112)
    self.page2()      # GET epicenter-logo.svg (request 201)
    self.page3()      # GET mandelbrot-logo.svg (request 301)

    grinder.sleep(56)
    self.page4()      # GET contour-logo.svg (request 401)
    self.page5()      # GET julia.svg (request 501)
    self.page6()      # GET opensource-logo.svg (request 601)
    self.page7()      # GET logo-white.svg (request 701)
    self.page8()      # GET map.svg (request 801)
    self.page9()      # GET logo.svg (request 901)
    self.page10()     # GET book-crawl.json (request 1001)

    grinder.sleep(104)
    self.page11()     # GET ss-symbolicons-block.woff (requests 1101-1102)

    grinder.sleep(6764)
    self.page12()     # GET / (requests 1201-1208)

    grinder.sleep(656)
    self.page13()     # GET epicenter-logo.svg (request 1301)
    self.page14()     # GET mandelbrot-logo.svg (request 1401)
    self.page15()     # GET contour-logo.svg (request 1501)
    self.page16()     # GET julia.svg (request 1601)
    self.page17()     # GET opensource-logo.svg (request 1701)
    self.page18()     # GET map.svg (request 1801)

    grinder.sleep(14)
    self.page19()     # GET logo-white.svg (request 1901)
    self.page20()     # GET logo.svg (request 2001)
    self.page21()     # GET book-crawl.json (request 2101)

    grinder.sleep(110)
    self.page22()     # GET ss-symbolicons-block.woff (requests 2201-2202)

    grinder.sleep(4486)
    self.page23()     # OPTIONS run (request 2301)

    grinder.sleep(99)
    self.page24()     # POST run (request 2401)
    self.page25()     # GET contour.min.map (request 2501)
    self.page26()     # GET jquery.min.map (request 2601)

    grinder.sleep(95)
    self.page27()     # OPTIONS a8e5cdbf-c5f1-4001-904c-4f00468197b6 (request 2701)

    grinder.sleep(90)
    self.page28()     # POST a8e5cdbf-c5f1-4001-904c-4f00468197b6 (request 2801)

    grinder.sleep(6408)
    self.page29()     # GET custom.json (requests 2901-2902)

    grinder.sleep(32945)
    self.page30()     # POST a8e5cdbf-c5f1-4001-904c-4f00468197b6 (request 3001)


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
Test(2900, 'Page 29').record(TestRunner.page29)
Test(3000, 'Page 30').record(TestRunner.page30)
