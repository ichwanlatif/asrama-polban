<!DOCTYPE html>
<html>
<head>
    <title>laravel 8 file upload example - ItSolutionStuff.com.com</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
  
<body>
<div class="container">
   
    <div class="panel panel-primary">
      <div class="panel-heading"><h2>laravel 8 file upload example - ItSolutionStuff.com.com</h2></div>
      <div class="panel-body">
   
        @if ($message = Session::get('success'))
        <div class="alert alert-success alert-block">
            <button type="button" class="close" data-dismiss="alert">×</button>
                <strong>{{ $message }}</strong>
        </div>
        @endif
  
        @if (count($errors) > 0)
            <div class="alert alert-danger">
                <strong>Whoops!</strong> There were some problems with your input.
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
  
        <form action="/perizinan/store" method="POST" enctype="multipart/form-data">
            @csrf
            <div>
    
                <div class="form-group">
                    <input type="hidden" name="user_id" class="form-control" value="1">
                </div>
                <div class="form-group">
                    <label>Perizinan Type</label>
                    <input type="text" name="perizinan_type" class="form-control">
                </div>
                <div class="form-group">
                    <label>Mulai</label>
                    <input type="date" name="perizinan_start_at" class="form-control">
                </div>
                <div class="form-group">
                    <label>Selesai</label>
                    <input type="date" name="perizinan_end_at" class="form-control">
                </div>
                <div class="form-group">
                    <label>Keterangan</label>
                    <input type="text" name="keterangan" class="form-control">
                </div>
                <div class="form-group">
                    <input type="file" name="file" class="form-control">
                </div>
   
                <div class="form-group">
                    <button type="submit" class="btn btn-success">Upload</button>
                </div>
   
            </div>
        </form>
  
      </div>
    </div>
</div>
</body>
  
</html>