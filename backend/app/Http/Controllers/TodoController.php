<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Todo::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {


        // $user = User::create($validatedData);
        $todo = Todo::create([
            'title' => $request->title,
            'category' => $request->category,
        ]);

        return response()->json([
            'message' => 'Todo created successfully',
            'todo' => $todo
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $todo = Todo::find($id);
        if (!$todo) {
            return response()->json(['message' => 'Task not found'], 404);
        }
        $todo->update([
            'is_completed' => $request->is_completed
        ]);

        return response()->json([
            'message' => 'Todo updated successfully',
            'todo' => $todo
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $todo = Todo::find($id);
        if (!$todo) {
            return response()->json(['message' => 'Task not found'], 404);
        }
        $todo->delete();
        return response()->json(['message' => 'Todo deleted successfully']);
    }
    public function clearCompleted()
    {
        $deletedCount = Todo::where('is_completed', true)->delete();
        return response()->json(['message' => "$deletedCount completed todos deleted successfully"]);
    }
}
