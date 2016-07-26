<?php

use Illuminate\Database\Seeder;

class NotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $user = DB::table('users')
		            ->select('id')
		            ->where('google_fname', 'Myles')
		            ->first()
		            ->id;

        for($i = 0; $i < 10; $i++)
        {
            DB::table('notes')->insert([
                'title' => str_random(10),
                'subtitle' => str_random(20),
                'body' => str_random(200),
                'user_id' => $user
            ]);
        }
    }
}
