<?php

namespace EneraTechTest\Core\UseCases\UpdateBook;

use EneraTechTest\Core\Entities\Book;
use Throwable;

interface UpdateBookOutputPort
{
    public function bookUpdated(Book $book): void;

    public function error(Throwable $throwable): void;
}
