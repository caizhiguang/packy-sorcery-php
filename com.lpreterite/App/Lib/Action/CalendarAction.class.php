<?php
class CalendarAction extends Action{

	public function index(){
		$this->display();
	}

	public function calendar(){
        $month = $_GET['month']?$_GET['month']:date('n');

        $year = date('Y');
        $day = date('j');

        $nextMonth = $month+1;
        $prevMonth = $month-1;

        $days = date('t',mktime(0,0,0,$month,$day,$year));
        $inWeek = date('w');
        $firstOfMonthInWeek = date('w',mktime(0,0,0,$month,1,$year));
        $lastOfMonthInWeek = date('w',mktime(0,0,0,$month,$days,$year));

        $displayCount = ($firstOfMonthInWeek-1)+(7-$lastOfMonthInWeek)+$days;
        $result = array(
            'year'=>$year,
            'month'=>$month,
            'day'=>$day,
            'days'=>array()
        );
        for ($i=0; $i < $displayCount; $i++) { 
            $number = $i-$firstOfMonthInWeek;
            $m = $month;
            if($i<$firstOfMonthInWeek){
                $number = date('t',mktime(0,0,0,$month-1,1,$year))-$firstOfMonthInWeek+$i;
                $m = $prevMonth;
            }
            if($i-$firstOfMonthInWeek>=$days){
                $number = $i-$firstOfMonthInWeek-$days;
                $m = $nextMonth;
            }

            $number++;

            $result['days'][]= array(
                'number'=>$number,
                'week'=>date('w',mktime(0,0,0,$m,$number,date('Y',mktime(0,0,0,$m,$year)))),
                'month'=>$m,
            );
        }

        return $result;
    }
}