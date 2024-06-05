<?php

namespace EneraTechTest\Infrastructure\Slim;

use EneraTechTest\Adapters\API\GetBooks\Controller as APIGetBooksController;
use EneraTechTest\Adapters\API\PatchBook\Controller as APIPatchBookController;
use EneraTechTest\Adapters\API\DeleteBook\Controller as APIDeleteController;
use EneraTechTest\Adapters\API\PostBook\Controller as Controller;
use Slim\Middleware\MethodOverrideMiddleware;
//use EneraTechTest\Adapters\API\HelloWorld\TestController as APIHelloWorldController;

class Routes
{
    public static function addAPIRoutes($app): void
    {

        // Add MethodOverride middleware
       // $app->add(new MethodOverrideMiddleware());

        // The RoutingMiddleware should be added after our CORS middleware so routing is performed first
       // $app->addRoutingMiddleware();

        $app->get('/api/books', APIGetBooksController::class);
        $app->post('/api/books', Controller::class);
        $app->get('/api/books/{bookID}', APIGetBooksController::class);
        $app->get('/livres', function ($request, $response) {                   
            $html = file_get_contents(dirname(__DIR__, 3). '/public/books.html');            
            $response->getBody()->write($html);                                         
            return $response;
        });
        $app->get('/poc', function ($request, $response) {                   
            $html = file_get_contents(dirname(__DIR__, 3). '/public/poc.html');            
            $response->getBody()->write($html);                                         
            return $response;
        });     
       $app->get('/js/{file:.*}', function ($request, $response, $args) {
            // Assurez-vous que le chemin vers vos fichiers statiques est correct
            $filePath = dirname(__DIR__, 3). '/public/js/' . $args['file'];
            if (file_exists($filePath)) {
                return $response->withHeader('Content-Type', 'application/javascript')
                                ->write(file_get_contents($filePath));
            } else {
                return $response->withStatus(404, 'Fichier non trouvé');
            }
        });             
        $app->patch('/books/{bookID}', APIPatchBookController::class);  
        /*$app->patch('/books/{id}', function ($request, $response) {
            $bookId = $request->getAttribute('id');            
            $data = $request->getParsedBody();
        
            // Vérifiez si le livre existe dans votre base de données
            // et récupérez les informations du livre actuel
        
            // Mettez à jour le titre du livre avec la nouvelle valeur
            if (isset($data['book']['title'])) {
                $newTitle = $data['book']['title'];                
        
                // Effectuez la mise à jour dans votre base de données
                // ...
        
                // Répondez avec un message de succès au format JSON
                $response->getBody()->write(json_encode(['message' => "Livre avec l'ID $bookId mis à jour avec le titre : $newTitle"]));
                return $response->withHeader('Content-Type', 'application/json');
            } else {
                return $response->withStatus(400)->withJson(['error' => 'Champ "book.title" manquant dans la requête']);
            }
        });*/
        
        
        $app->get('/livre/{id}', function ($request, $response) {                   
            $html = file_get_contents(dirname(__DIR__, 3). '/public/book.html');            
            $response->getBody()->write($html);                                         
            return $response;
        });

        
        //$app->delete('/books/{id}', APIDeleteController::class);        
    }
}
