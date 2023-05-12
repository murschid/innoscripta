<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string("source_id")->nullable();
            $table->string("source_name")->nullable();
            $table->string("api")->nullable();
            $table->string("author")->nullable();
            $table->string("title", 500)->unique();
            $table->string("category")->nullable();
            $table->text("description")->nullable();
            $table->string("url", 500)->nullable();
            $table->string("url_to_image", 500)->nullable();
            $table->string("published_at")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
