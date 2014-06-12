# The Grinder 3.11
# HTTP script recorded by TCPProxy at May 29, 2014 3:14:05 PM

import re
from net.grinder.script import Test
from net.grinder.script.Grinder import grinder
from net.grinder.plugin.http import HTTPPluginControl, HTTPRequest
from HTTPClient import NVPair
connectionDefaults = HTTPPluginControl.getConnectionDefaults()
httpUtilities = HTTPPluginControl.getHTTPUtilities()

staticHeaders = [
  NVPair('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'),
  NVPair('Accept-Encoding', 'gzip,deflate,sdch'),
  NVPair('Accept-Language', 'en-US,en;q=0.8'),
  NVPair('Cache-Control', 'no-cache'),
  NVPair('Pragma', 'no-cache'),
  NVPair('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36'),
  NVPair('Connection', 'keep-alive')
]

apiHeaders = [
  NVPair('Content-Type', 'application/json; charset=UTF-8'),
  NVPair('Accept', 'application/json, text/javascript, */*; q=0.01')
]

matcher = re.compile('.*"id":\s*"([^"]+)".*')


# To use a proxy server, uncomment the next line and set the host and port.
# connectionDefaults.setProxyServer("localhost", 8001)

def createRequest(test, url, headers=staticHeaders):
    """Create an instrumented HTTPRequest."""
    request = HTTPRequest(url=url)
    if headers: request.headers=headers
    test.record(request, HTTPRequest.getHttpMethodFilter())
    return request

# These definitions at the top level of the file are evaluated once,
# when the worker process is started.

url0 = 'http://forio.com/'
url1 = 'http://api.forio.com:80'

request101 = createRequest(Test(101, 'GET /'), url0)

request102 = createRequest(Test(102, 'GET jquery.min.js'), url0)

request103 = createRequest(Test(103, 'GET main.css'), url0)

request104 = createRequest(Test(104, 'GET lodash.min.js'), url0)

request105 = createRequest(Test(105, 'GET d3.min.js'), url0)

request106 = createRequest(Test(106, 'GET backbone.js'), url0)

request107 = createRequest(Test(107, 'GET contour.min.js'), url0)

request108 = createRequest(Test(108, 'GET app.js'), url0)

request201 = createRequest(Test(201, 'GET epicenter-logo.svg'), url0)

request301 = createRequest(Test(301, 'GET mandelbrot-logo.svg'), url0)

request401 = createRequest(Test(401, 'GET contour-logo.svg'), url0)

request501 = createRequest(Test(501, 'GET julia.svg'), url0)

request601 = createRequest(Test(601, 'GET opensource-logo.svg'), url0)

request701 = createRequest(Test(701, 'GET map.svg'), url0)

request801 = createRequest(Test(801, 'GET logo-white.svg'), url0)

request901 = createRequest(Test(901, 'GET logo.svg'), url0)

request1001 = createRequest(Test(1001, 'GET book-crawl.json'), url0)

request1101 = createRequest(Test(1101, 'GET ss-symbolicons-block.woff'), url0)

request1102 = createRequest(Test(1102, 'GET marker-sprite-shadow.png'), url0)

request1201 = createRequest(Test(1201, 'OPTIONS run'), url1, apiHeaders)

request1301 = createRequest(Test(1301, 'POST run'), url1, apiHeaders)

request1401 = createRequest(Test(1401, 'OPTIONS {{run.id}}'), url1, apiHeaders)

request1501 = createRequest(Test(1501, 'POST {{run.id}}'), url1, apiHeaders)

request1601 = createRequest(Test(1601, 'GET sf-sightseeing.json'), url0)

request1701 = createRequest(Test(1701, 'POST {{run.id}}'), url1, apiHeaders)

request1801 = createRequest(Test(1801, 'GET business-deliver.json'), url0)

request1901 = createRequest(Test(1901, 'POST {{run.id}}'), url1, apiHeaders)


class TestRunner:
  """A TestRunner instance is created for each worker thread."""

  # A method for each recorded page.
  def page1(self):
    """GET / (requests 101-108)."""
    result = request101.GET('/app/showcase/route-optimizer')
    self.token_family = \
      httpUtilities.valueFromBodyURI('family') # 'Open+Sans:300'

    grinder.sleep(51)
    request102.GET('/app/showcase/route-optimizer/vendor/jquery/dist/jquery.min.js')

    request103.GET('/app/showcase/route-optimizer/styles/main.css')

    request104.GET('/app/showcase/route-optimizer/vendor/lodash/dist/lodash.min.js')

    request105.GET('/app/showcase/route-optimizer/vendor/d3/d3.min.js')

    request106.GET('/app/showcase/route-optimizer/vendor/backbone/backbone.js')

    request107.GET('/app/showcase/route-optimizer/vendor/contour/dist/contour.min.js')

    grinder.sleep(63)
    request108.GET('/app/showcase/route-optimizer/scripts/app.js')

    return result

  def page2(self):
    """GET epicenter-logo.svg (request 201)."""
    result = request201.GET('/app/showcase/route-optimizer/styles/assets/logos/epicenter-logo.svg')

    return result

  def page3(self):
    """GET mandelbrot-logo.svg (request 301)."""
    result = request301.GET('/app/showcase/route-optimizer/styles/assets/logos/mandelbrot-logo.svg')

    return result

  def page4(self):
    """GET contour-logo.svg (request 401)."""
    result = request401.GET('/app/showcase/route-optimizer/styles/assets/logos/contour-logo.svg')

    return result

  def page5(self):
    """GET julia.svg (request 501)."""
    result = request501.GET('/app/showcase/route-optimizer/styles/assets/logos/julia.svg')

    return result

  def page6(self):
    """GET opensource-logo.svg (request 601)."""
    result = request601.GET('/app/showcase/route-optimizer/styles/assets/logos/opensource-logo.svg')

    return result

  def page7(self):
    """GET map.svg (request 701)."""
    result = request701.GET('/app/showcase/route-optimizer/styles/assets/logos/map.svg')

    return result

  def page8(self):
    """GET logo-white.svg (request 801)."""
    result = request801.GET('/app/showcase/route-optimizer/styles/assets/logo-white.svg')

    return result

  def page9(self):
    """GET logo.svg (request 901)."""
    result = request901.GET('/app/showcase/route-optimizer/styles/assets/logo.svg')

    return result

  def page10(self):
    """GET book-crawl.json (request 1001)."""
    result = request1001.GET('/app/showcase/route-optimizer/data/book-crawl.json')

    return result

  def page11(self):
    """GET ss-symbolicons-block.woff (requests 1101-1102)."""
    result = request1101.GET('/app/showcase/route-optimizer/styles/assets/fonts/symbolicons/ss-symbolicons-block.woff')

    grinder.sleep(639)
    request1102.GET('/app/showcase/route-optimizer/styles/assets/marker-sprite-shadow.png')

    return result

  def page12(self):
    """OPTIONS run (request 1201)."""
    result = request1201.OPTIONS('/model/run',
      '''0\r\n\r\n''')

    return result

  def page13(self):
    """POST run (request 1301)."""
    result = request1301.POST('/model/run',
      '{\"account\":\"showcase\",\"project\":\"route-optimizer\",\"model\":\"TSPModel.jl\"}')

    return result

  def page14(self, runId):
    """OPTIONS {{run.id}} (request 1401)."""
    result = request1401.OPTIONS('/model/operation/' + runId,
      '''0\r\n\r\n''')

    return result

  def page15(self, runId):
    """POST {{run.id}} (request 1501)."""
    result = request1501.POST('/model/operation/' + runId,
      '{\"name\":\"solve\",\"arguments\":[[[0,2449,3433,5656,1584,2994,5198,8013,3829],[1840,0,1247,5898,2455,4450,5454,9468,5285],[3056,1441,0,6532,3671,5688,4928,14670,6522],[5415,4986,5943,0,3606,4246,2589,7557,2759],[1808,2462,3855,4495,0,2656,4050,7674,3609],[2839,4407,5192,4666,2700,0,4681,5672,2320],[5506,4923,5252,2864,3698,4589,0,9252,4454],[8086,9654,13904,8282,7947,5247,9642,0,4904],[4476,5761,6545,2673,3893,2220,4480,5374,0]]]}')

    return result

  def page16(self):
    """GET sf-sightseeing.json (request 1601)."""
    result = request1601.GET('/app/showcase/route-optimizer/data/sf-sightseeing.json')

    return result

  def page17(self, runId):
    """POST {{run.id}} (request 1701)."""
    result = request1701.POST('/model/operation/' + runId,
      '{\"name\":\"solve\",\"arguments\":[[[0,10205,6037,3696,5488,10761,4622,2329,4190],[14522,0,9107,11063,12810,12396,12936,11973,13674],[12343,4168,0,8885,10632,8712,10758,9795,11496],[3523,7369,3202,0,1789,10623,1453,4471,2426],[4713,8193,4025,2001,0,11996,1650,5844,1466],[10469,8465,9478,10670,12414,0,12088,7895,12033],[4469,8601,4434,2257,1606,11903,0,5751,2243],[2601,7957,3789,4350,6094,8238,5768,0,5714],[3518,9056,4888,3023,1278,11594,2219,5597,0]]]}')

    return result

  def page18(self):
    """GET business-deliver.json (request 1801)."""
    result = request1801.GET('/app/showcase/route-optimizer/data/business-deliver.json')

    return result

  def page19(self, runId):
    """POST {{run.id}} (request 1901)."""
    result = request1901.POST('/model/operation/' + runId,
      '{\"name\":\"solve\",\"arguments\":[[[0,11635,5399,7804,15904,5065,13521,14630,9511],[11917,0,9505,7414,3734,7516,3887,5579,2966],[5660,9744,0,7564,7766,5466,5431,7728,6181],[7877,7411,11729,0,11029,2928,8918,13041,6701],[15082,3733,7681,10826,0,9743,2966,3466,5147],[5727,7432,5471,2869,9597,0,6737,10619,4483],[13388,3773,5887,7962,3159,6776,0,4984,2597],[14253,5713,8738,12582,3756,9831,4722,0,6902],[10172,2965,5741,6258,5179,5416,2692,7016,0]]]}')

    return result

  def __call__(self):
    """Called for every run performed by the worker thread."""
    self.page1()      # GET / (requests 101-108)

    grinder.sleep(596)
    self.page2()      # GET epicenter-logo.svg (request 201)
    self.page3()      # GET mandelbrot-logo.svg (request 301)
    self.page4()      # GET contour-logo.svg (request 401)
    self.page5()      # GET julia.svg (request 501)
    self.page6()      # GET opensource-logo.svg (request 601)
    self.page7()      # GET map.svg (request 701)
    self.page8()      # GET logo-white.svg (request 801)
    self.page9()      # GET logo.svg (request 901)
    self.page10()     # GET book-crawl.json (request 1001)

    grinder.sleep(140)
    self.page11()     # GET ss-symbolicons-block.woff (requests 1101-1102)

    grinder.sleep(4941)
    self.page12()     # OPTIONS run (request 1201)

    grinder.sleep(111)

    json = self.page13().text     # POST run (request 1301)
    run = matcher.match(json).group(1)

    grinder.logger.info(run)


    grinder.sleep(114)
    self.page14(run)     # OPTIONS {{run.id}} (request 1401)

    grinder.sleep(124)
    self.page15(run)     # POST {{run.id}} (request 1501)

    grinder.sleep(38305)
    self.page16()     # GET sf-sightseeing.json (request 1601)

    grinder.sleep(2286)
    self.page17(run)     # POST {{run.id}} (request 1701)

    grinder.sleep(15556)
    self.page18()     # GET business-deliver.json (request 1801)

    grinder.sleep(3003)
    self.page19(run)     # POST {{run.id}} (request 1901)


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
