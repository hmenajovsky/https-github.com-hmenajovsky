<?php

namespace EneraTechTest\Adapters\API\PatchBook;

use EneraTechTest\Adapters\API\APIPresenter;
use EneraTechTest\Core\Entities\Book;
use EneraTechTest\Core\UseCases\UpdateBook\UpdateBookOutputPort;
use Throwable;

class Presenter extends APIPresenter implements UpdateBookOutputPort
{
    public function bookUpdated(Book $book): void
    {
        $this->responseCode = 201;
        $this->viewModel = ["book" => $book];
    }

    public function error(Throwable $throwable): void
    {
        $this->responseCode = 500;
        $this->viewModel = ["error" => [
            "message" => $throwable->getMessage()
        ]];
    }
}
