<?php

namespace EneraTechTest\Core\UseCases\UpdateBook;

use EneraTechTest\Core\Entities\Book;
use EneraTechTest\Infrastructure\DataAccess\DBContext;
use EneraTechTest\Core\ValueObjects\Iso8601String;

class UpdateBook
{
    public function __construct(
        private DBContext $dBContext,
    ) {
    }

    public function execute(UpdateBookInputPort $input, UpdateBookOutputPort $output): void
    {
        $book = new Book(
            $input->bookInformations["title"],                  
            $input->bookInformations["releaseDate"]
        );
        
        try {

            $this->dBContext->persist($book);
            $this->dBContext->flush();
        } catch (\Throwable $th) {

            $output->error($th);
            return;
        }

        $output->bookUpdated($book);
    }

   
}
