<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class ArticleController extends Controller
{
    // This method is for user customized news fees, also it can search and filter the news feed.
    public function index(Request $request)
    {
        $query = Article::query();

        $sources = Setting::select("name as sources")->where(['user_id' => $request->input("user"), 'type' => 'source'])->get()->toArray();
        $authors = Setting::select("name as authors")->where(['user_id' => $request->input("user"), 'type' => 'author'])->get()->toArray();
        $categories = Setting::select("name as categories")->where(['user_id' => $request->input("user"), 'type' => 'category'])->get()->toArray();

        if ($request->input("user")) {
            $query->whereNotIn("source_name", $sources);
            $query->whereNotIn("category", $categories);
            $query->whereNotIn("author", $authors);
        }

        if ($date = $request->input("date")) {
            $query->whereDate("published_at", $date);
        }

        if ($author = $request->input("author")) {
            $query->where("author", $author);
        }

        if ($source = $request->input("source")) {
            $query->where("source_name", $source);
        }

        if ($category = $request->input("category")) {
            $query->where("category", $category);
        }

        if ($s = $request->input('s')) {
            $query->where("title", "LIKE", "%" . $s . "%")->orWhere("description", "LIKE", "%" . $s . "%");
        }

        if ($sort = $request->input("sort")) {
            $query->orderBy("published_at", $sort);
        }

        $total = $query->count();
        $perPage = 18;
        $page = $request->input('page', 1);

        $articles = $query->offset(($page - 1) * $perPage)->limit($perPage)->get();

        return response()->json([
            "articles" => $articles,
            'total' => $total,
            'page' => $page,
            'lastPage' => ceil($total / $perPage)
        ], 200);
    }

    // This method is for checking user customization for news feed
    public function checkSetting(Request $request)
    {
        $sources = Setting::select("name")->where(['user_id' => $request->input("user"), 'type' => 'source'])->get()->toArray();
        $authors = Setting::select("name")->where(['user_id' => $request->input("user"), 'type' => 'author'])->get()->toArray();
        $categories = Setting::select("name")->where(['user_id' => $request->input("user"), 'type' => 'category'])->get()->toArray();

        return response()->json([
            'sources' => $sources,
            'authors' => $authors,
            "categories" => $categories
        ]);
    }

    // This method returns user customization info for user news feed
    public function customizeInfo()
    {
        $sources = Article::select("source_name")->distinct()->get();
        $authors = Article::select("author")->distinct()->get();
        $categories = Article::select("category")->distinct()->get();

        return response()->json([
            "sources" => $sources,
            "authors" => $authors,
            "categories" => $categories,
        ], 200);
    }

    // This method will call others methods which is responsible for inserting news from API
    public function insertNews()
    {
        $this->newsApi();
        $this->mediaStack();
        $this->theGuardian();
        return redirect('http://127.0.0.1:8080');

        return response()->json(['message' => 'News inserted successfully']);
    }

    // This method is for storing data from mediastack news API
    public static function mediaStack()
    {
        $api = "http://api.mediastack.com/v1/news?access_key=e1de6923c75cb7f8b6f0eb6695d8b097";
        $response = Http::get($api);
        $articles = json_decode($response->body())->data;

        foreach ($articles as $news) {
            if (!DB::table("articles")->where("title", $news->title)->first()) {
                $article = new Article();
                $article->source_id = $news->source ? $news->source : "Unknown";
                $article->source_name = $news->source ? $news->source : "Unknown";
                $article->author = $news->author ? explode(",", $news->author)[0] : "Unknown";
                $article->title = $news->title;
                $article->description = $news->description ? $news->description : "";
                $article->category = $news->category ? $news->category : "General";
                $article->url = $news->url;
                $article->url_to_image = $news->image ? explode(" ", $news->image)[0] : "";
                $article->published_at = $news->published_at;
                $article->save();
            }
        }
        return response([
            "message" => "Data inserted successfully"
        ], 201);
    }

    // This method is for storing data from newsapi.org news API
    public static function newsApi()
    {
        $api = "https://newsapi.org/v2/top-headlines?country=us&apiKey=554447ff942b4466a5e024fa91dc7f64";
        $response = Http::get($api);
        $articles = json_decode($response->body())->articles;

        foreach ($articles as $news) {
            if (!DB::table("articles")->where("title", $news->title)->first()) {
                $article = new Article();
                $article->source_id = $news->source->id ? $news->source->id : "Unknown";
                $article->source_name = $news->source->name ? $news->source->name : "Unknown";
                $article->author = $news->author ? explode(",", $news->author)[0] : "Unknown";
                $article->title = $news->title;
                $article->description = $news->description ? $news->description : "";
                $article->category = "General";
                $article->url = $news->url;
                $article->url_to_image = $news->urlToImage ? $news->urlToImage : "";
                $article->published_at = $news->publishedAt;
                $article->save();
            }
        }
        return response([
            "message" => "Data inserted successfully"
        ], 201);
    }

    // This method is for storing data from The Guardian news API
    public static function theGuardian()
    {
        $api = "https://content.guardianapis.com/search?api-key=ad47a302-e2cd-41e2-a505-b348ea046afa";
        $response = Http::get($api);
        $articles = json_decode($response->body())->response->results;

        foreach ($articles as $news) {
            if (!DB::table("articles")->where("title", $news->webTitle)->first()) {
                $article = new Article();
                $article->source_id = $news->id ? $news->id : "Unknown";
                $article->source_name = "The Guardian";
                $article->author = "The Guardian";
                $article->title = $news->webTitle;
                $article->description = $news->webTitle;
                $article->category = $news->sectionName;
                $article->url = $news->webUrl;
                $article->url_to_image = "https://birn.eu.com/wp-content/uploads/2018/11/guardian-300x201.png";
                $article->published_at = $news->webPublicationDate;
                $article->save();
            }
        }
        return response([
            "message" => "Data inserted successfully"
        ], 201);
    }

    // This method is for returning searched value. It's not using anymore though
    public function search(Request $request)
    {
        $articles = Article::where("title", "LIKE", "%" . $request->title . "%")->get();
        return response($articles, 200);
    }

    // This method stores the user customization data which he/she doesn't want to see in the news feed
    public function storeSetting(Request $request)
    {
        $data = Setting::where($request->all())->get();
        if (count($data) < 1) {
            $res = DB::table('settings')->insert($request->all());
        }
        return response($res);
    }

    // This method removes the user customization data which he/she selected to not seeing in the news feed
    public function deleteSetting(Request $request)
    {
        $res = DB::table('settings')->where($request->all())->delete();
        return response($res);
    }
}
