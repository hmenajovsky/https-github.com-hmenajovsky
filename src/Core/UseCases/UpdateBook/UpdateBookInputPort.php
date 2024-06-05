<?php

namespace EneraTechTest\Core\UseCases\UpdateBook;

use EneraTechTest\Core\ValueObjects\Iso8601String;

class UpdateBookInputPort
{ 
    public function  __construct(
        public array $bookInformations[]
    ) {
        
    }
}
