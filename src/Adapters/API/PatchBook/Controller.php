<?php

namespace EneraTechTest\Adapters\API\PatchBook;

use EneraTechTest\Adapters\API\APIController;
use EneraTechTest\Core\UseCases\UpdateBook\UpdateBook;
use EneraTechTest\Core\UseCases\UpdateBook\UpdateBookInputPort;
use EneraTechTest\Core\ValueObjects\Iso8601String;
use EneraTechTest\Adapters\API\PatchBook\Presenter;
use EneraTechTest\Core\Entities\Book;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class Controller extends APIController
{
    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        UpdateBook $useCase,
    ) {
        $presenter = new Presenter();
        

        try {            
            // Ici, nous récupérons l'ID du livre à partir de l'URI.
            $bookId = $request->getAttribute('id');            

            if (!is_null($bookId)) {

            $input = $this->tryGetUseCaseInput($request->getParsedBody()["book"] ?? []);
            }
        } catch (\Throwable $th) {
            return $this->renderBadRequest($response, ["error" => ["message" => $th->getMessage()]]);
        }

        $useCase->execute($input, $presenter);

        return $this->render($response, $presenter);
    }

    private function tryGetUseCaseInput(array $book): UpdateBookInputPort
     {
        
        $title= $book["title"];

        $releaseDate = new Iso8601String($book["releaseDate"] ?? '');

        return new UpdateBookInputPort([            
                "title" => $title,
                "releaseDate" => $releaseDate,                    
        ]);

}
}