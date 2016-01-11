<?php

    require 'Slim/Middleware.php';
    require 'Slim/Middleware/HttpBasicAuth.php';

    use \Slim\Extras\Middleware\HttpBasicAuth;

    class Route {

        public function __construct($method = "GET",$route = "") {
            $this->method = $method;
            $this->route = $route;
        }

    }

    class BasicAuth extends HttpBasicAuth {
        protected $route;

        public function __construct($username, $password, $realm = 'Protected Area', $protectedRoutes = array()) {
            $this->protectedRoutes = $protectedRoutes;
            parent::__construct($username, $password, $realm);        
        }

        public function call() {

            $method = $this->app->request->getMethod();
            $path = $this->app->request()->getPathInfo();

            foreach ($this->protectedRoutes as $route) {
                $pos = strpos($path, $route->route);
                if (($pos !== false) && ($pos == 0)  && ($method == $route->method)) {
                    parent::call();
                    return;
                }
            }
            $this->next->call();
        }
    }

?>