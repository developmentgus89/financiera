<?php

abstract class OperationsPaysClient{    
    /**
     * getRowsCreditsByClient
     *
     * @return array
     */
    abstract public function getRowsCreditsByClient(int $icvecliente): array;
    
    /**
     * getRowCredit
     *
     * @param  int $id
     * @return array
     */
    abstract public function getRowSingleCredit(int $id, int $icvecliente): ?array;
    
    /**
     * insertRow
     *
     * @param  array $data
     * @return bool
     */
    abstract public function insertRow(array $data): ?array;
    
    /**
     * updateRowByClients
     *
     * @param  int $id
     * @param  array $data
     * @return bool
     */
    abstract public function updateRowByClients(int $id, array $data): ?array;
    
    /**
     * delete
     *
     * @param  int $id
     * @return bool
     */
    abstract public function delete(int $id, int $icvecliente): ?array;
    
}