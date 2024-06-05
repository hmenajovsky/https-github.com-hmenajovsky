<?php

namespace EneraTechTest\Adapters\API\HelloWorld;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use EneraTechTest\Adapters\API\APIController;
use EneraTechTest\Adapters\API\APIPresenter;
//use EneraTechTest\Core\Entities\Book;

use EneraTechTest\Infrastructure\DataAccess\DBContext;

class TestController extends APIController
{
    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response
    ) {
        // Votre logique ici...
        $message = "Hello World";

        // Renvoyer la réponse avec le message
        return $response->withStatus(200)->withHeader('Content-Type', 'text/plain')->getBody()->write($message);
    }
}

