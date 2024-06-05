<?php

use EneraTechTest\Infrastructure\DataAccess\DBContext;
use EneraTechTest\Infrastructure\Database\LocalFileDBContext;
use EneraTechTest\Infrastructure\DI\Container;

return [

    DBContext::class => DI\get(LocalFileDBContext::class),

];
