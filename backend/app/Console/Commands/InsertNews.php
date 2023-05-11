<?php

namespace App\Console\Commands;

use App\Http\Controllers\Api\ArticleController;
use Illuminate\Console\Command;

class InsertNews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'insert-news';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $articles = new ArticleController();
        $articles->insertNews();
    }
}
