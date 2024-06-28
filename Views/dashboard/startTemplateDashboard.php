<?php
  header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
  header("Pragma: no-cache"); // HTTP 1.0.
  header("Expires: 0"); 
?>
<body class="hold-transition sidebar-mini">
    <div class="wrapper">
        <!-- Navbar -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light bar-logout">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="colortext nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars colortext"></i></a>
                </li>
            </ul>

            <!-- Right navbar links -->
            <ul class="navbar-nav ml-auto">
                <!-- Navbar Search -->
                <li class="nav-item">
                    <a class="nav-link" data-widget="navbar-search" href="#" role="button" id="logout">
                        <i class="fas fa-sign-out-alt colortext"> </i> <span class="colortext">Salir</span>
                    </a>
                </li>
            </ul>

        </nav>
        <!-- /.navbar -->

        <!-- Main Sidebar Container -->
        <aside class="main-sidebar sidebar-dark-primary elevation-4 slide-menu">
            <!-- Brand Logo -->
            <a href="dashboard.php" class="brand-link">
                <img src="../utils/img/icons.png" alt="Sistema de Inventario" class="brand-image img-circle elevation-3" style="opacity: .8">
                <span class="brand-text font-weight-light text-titled">Servicios | Mayorqu&iacute;n</span>
            </a>

            <!-- Sidebar -->
            <div class="sidebar">
                <!-- Sidebar user panel (optional) -->
                <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div class="image">
                        <img src="../utils/img/avatar.png" class="img-circle elevation-2" alt="User Image">
                    </div>
                    <div class="info">
                        <a href="#" class="d-block"><?php echo $_SESSION['cnombre'] . ' ' . $_SESSION['capellido'] ?></a>
                    </div>
                </div>

            <?php
                include_once "menu/menu.php";
            ?>
                
            </div>
            <!-- /.sidebar -->
        </aside>

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper main-dashboard">
            <!-- Content Header (Page header) -->
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">SM v. 1.0</h1>
                        </div><!-- /.col -->
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <h3>Servicios Mayorqu&iacute;n</h3>
                            </ol>
                        </div><!-- /.col -->
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content-header -->